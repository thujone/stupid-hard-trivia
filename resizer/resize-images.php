<?php
/**
 * Intended to be invoked via CLI, this script reads a config file and then downsizes
 * images to the specified sizes and stores them in the specified directories
 */

// check for GD
if (!extension_loaded("gd")) {
	die("You must have the GD extension to use this script");
}

// load the JSON configuration file
$config_path = dirname(__FILE__) . "/resize-images-config.json";
if (!file_exists($config_path)) {
	throw new Exception("$config_path not found");
}
if (!is_readable($config_path)) {
	throw new Exception("$config_path not readable");
}
$config_json = file_get_contents($config_path);
if (!$config_json) {
	throw new Exception("Config file read result empty!");
}

// parse & validate JSON config
$config = json_decode($config_json, TRUE); // force associative array
if (!$config || !is_array($config)) {
	throw new Exception("JSON config file did not parse correctly");
}
// check for original-images path
if (!array_key_exists("original-images", $config)) {
	throw new Exception("JSON config must define original-images -- a path to the original, large images");
}
$original_image_dir = $config["original-images"];
dir_check($original_image_dir, FALSE);
$destination_base_dir = dirname($original_image_dir) . "/";
dir_check($destination_base_dir);

echo "Resized images will be written to $destination_base_dir\n";

// validate config resize directories
if (!array_key_exists("resize-directories", $config)) {
	throw new Exception("JSON config must define resize-directories -- an array of objects, each specifying dir and width");
}
$resize_directories = $config["resize-directories"];
if (!is_array($resize_directories)) {
	throw new Exception("JSON config resize-directories must be an array");
}
foreach($resize_directories as $index => $dir) {
	validate_resize_dir($index, $dir);
}


echo "STARTING CONVERSION\n\n";

$original_files = get_image_list($original_image_dir);
foreach($original_files as $img_path) {
	$img_filename = basename($img_path, PATHINFO_FILENAME);
	echo $img_filename . "\n";
	try {
		if (!is_readable($img_path)) {
			throw new Exception("Cannot read $img_path");
		}
		
		
		
		foreach($resize_directories as $rdir) {
			try {
				$destination_dir = $destination_base_dir . $rdir["dir"];
				if (!file_exists($destination_dir)) {
					echo "attempting to create dir $destination_dir\n";
					if (!mkdir($destination_dir)) {
						throw new Exception("Unable to create directory $destination_dir");
					}
				}
				$destination_img_path = $destination_dir . "/" . $img_filename;
				resize_image($img_path, $destination_img_path, $rdir["width"]);
			} catch(Exception $e) {
				echo "Exception caught processing $img_filename:\n\t" . $e->getMessage() . "\n\tSKIPPING\n";
			}
		}
		
		
	} catch(Exception $e) {
		echo "Exception caught processing $img_filename:\n\t" . $e->getMessage() . "\n\tSKIPPING\n";
	}
}








die("\nFINISHED\n");

function dir_check($dir, $writable=TRUE) {
	if (!file_exists($dir)) {
		throw new Exception("Directory $dir does not exist in the file system");
	}
	if (!is_readable($dir)) {
		throw new Exception("$dir is not readable");
	}
	if ($writable) {
		if (!is_writable($dir)) {
			throw new Exception("$dir is not writable");
		}
	}
}

/**
 * Used to validate the JSON config's resize_directory element
 * @param int $index The index of the current dir being examined
 * @param array $dir associative array, must have dir and width elements
 * @throws Exception
 */
function validate_resize_dir($index, $dir) {
	if (!is_array($dir)) {
		throw new Exception("Resize directory element $index is not an associative array");
	}
	if (!array_key_exists("dir", $dir)) {
		throw new Exception("Resize directory element $index doesn't define dir");
	}
	$dirname = $dir["dir"];
	if (!preg_match('/^[a-zA-Z0-9\-_]+$/D', $dirname)) {
		throw new Exception("Resize directory element $index dir value $dirname is not valid. A-Z, 0-9, dashes, and underscores only.");
	}
	if (!array_key_exists("width", $dir)) {
		throw new Exception("Resize directory element $index doesn't define width. It must be an integer between 1 and 2048");
	}
	$width = $dir["width"];
	if (!is_int($width)) {
		throw new Exception("Resize directory element $index specified a width value that is not an integer. Must be integer between 1 and 2048");
	}
	if ($width < 1 || $width > 2048) {
		throw new Exception("Resize directory element $index out of bounds. $width is not between 1 and 2048");
	}
}

/**
 * Scans the specified directory (but not its subdirectories) for image filenames
 * @param string $dir
 * @return array
 */
function get_image_list($dir) {
	$retval = array();
	// we'll scan for UPPERCASE and lowercase files ending with these suffixes
	$suffixes = array("png", "jpg", "jpeg", "gif");
	foreach($suffixes as $suffix) {
		$tmp1 = glob($dir . "/*." . strtolower($suffix));
		$tmp2 = glob($dir . "/*." . strtoupper($suffix));
		$retval = array_merge($retval, $tmp1, $tmp2);
		unset($tmp1);
		unset($tmp2);
	}
	sort($retval);
	return $retval;
}

/**
 * Loads the image file into an object we can manipulate
 * @param string $img_path file path to the image
 * @throws Exception
 * @return NULL|resource
 */
function load_image($img_path, $img_suffix) {
	$retval = null;
	switch($img_suffix) {
		case "png":
		case "PNG":
			$retval = imagecreatefrompng($img_path);
			break;
		case "jpg":
		case "JPG":
		case "jpeg":
		case "JPEG":
			$retval = imagecreatefromjpeg($img_path);
			break;
		case "gif":
		case "GIF":
			$retval = imagecreatefromgif($img_path);
			break;
		default:
			throw new Exception("$img_suffix is not a recognized image suffix");
			
	}
	if (!$retval) {
		throw new Exception("Unable to load image $img_path");
	}
	
	return $retval;
}

/**
 * Proportionally resizes the specified image to the new width and stores in the specified subdir
 * @param string $path file system path to the original image file
 * @param string $new_image_path file system path of the image file to be created e.g., /foo/bar/image.jpg
 * @param int $width The target width of the new image
 * @throws Exception
 */
function resize_image($path, $new_image_path, $new_width) {
// 	echo "resizing $path to $new_image_path with width $new_width\n";
	
	// check image dimensions
	$size = getimagesize($path);
	if (!$size) {
		throw new Exception("Unable to read image dimensions of $path");
	}

	$orig_width = $size[0];
	$orig_height = $size[1];
	
	$scale = $new_width / $orig_width;
	$new_height = round($orig_height * $scale);
	
	echo "new dimensions: $new_width x $new_height \n";

	$new_image = imagecreatetruecolor($new_width, $new_height);
	if (!$new_image) {
		throw new Exception("Unable to create new image with dimensions $new_width x $new_height");
	}

	// TODO we could also extract this from $size var above
	$img_suffix = pathinfo($path, PATHINFO_EXTENSION);
	
	// load the original image
	$orig_image = load_image($path, $img_suffix);
	
	// resize/resample the old image into the new one
	imagecopyresampled($new_image, $orig_image, 0, 0, 0, 0, $new_width, $new_height, $orig_width, $orig_height);
	
	write_image($new_image, $new_image_path, $img_suffix);
	
	unset($new_image);
	unset($orig_image);
	
}

/**
 * Writes the specified image to a file
 * @param resource $img image resource object
 * @param string $img_path file path to which we write the image
 * @param string $img_suffix the file suffix (eg jpeg, JPG, png, etc) 
 * @throws Exception
 */
function write_image($img, $img_path, $img_suffix) {
	$retval = null;
	switch($img_suffix) {
		case "png":
		case "PNG":
			$retval = imagepng($img, $img_path); // TODO specify quality
			break;
		case "jpg":
		case "JPG":
		case "jpeg":
		case "JPEG":
			$retval = imagejpeg($img, $img_path); // TODO specify quality
			break;
		case "gif":
		case "GIF":
			$retval = imagegif($img, $img_path);
			break;
		default:
			throw new Exception("$img_suffix is not a recognized image suffix");
			
	}
	if (!$retval) {
		throw new Exception("Unable to write $img_suffix to image $img_path");
	}
	
	return $retval;
}
