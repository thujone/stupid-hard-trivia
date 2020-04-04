/**
 * SNEAKYIMP.Crypt - a JS library to provide simple encryption functions.
 * 
 * This code is provided primarily as a tool to obfuscate data, and is not to
 * be considered cryptographically secure for any sensitive application.
 * 
 * NO WARRANTY IS EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

(function(){
	//if (!jQuery) throw "SNEAKYIMP.Crypt requires jQuery to work";
	
	
	// encryption object to encapsulate functions
	var Crypt = function() {
            // properties here
            this.symmetricKey = null;
	}; // Crypt

	// public method to set the symmetric key for encrypt/decrypt operations
	Crypt.prototype.setSymmetricKey = function(key) {
		// TODO: validate the key
		this.symmetricKey = key;
	}
	// public method to symmetrically encrypt data
	Crypt.prototype.symmetricEncipher = function(data) {
		// TODO: validate the key
		if (!this.symmetricKey) {
			throw ("No symmetric key defined. Unable to encipher");
		}
		return Crypt.staticSymmetricEncrypt(this.symmetricKey, data);
	}
	// public method to symmetrically decrypt data
	Crypt.prototype.symmetricDecipher = function(encryptedData) {
		// TODO: validate the key
		if (!this.symmetricKey) {
			throw ("No symmetric key defined. Unable to decipher");
		}
		return Crypt.staticSymmetricDecrypt(this.symmetricKey, encryptedData);
	}
	
	// static method for symmetric encryption
	// returns base64-encoded string of the dataString
	Crypt.staticSymmetricEncryptString = function(key, dataString) {
		var binaryString = Crypt.toBinary(key, dataString);
		return btoa(binaryString);
	};
	// static method for symmetric decryption
	Crypt.staticSymmetricDecryptString = function(key, encryptedDataString) {
		const binaryString = atob(encryptedDataString);
		return Crypt.fromBinary(key, binaryString);
	};
	
	
	
	// static methods for converting strings to binary and back
	// see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa
	// convert a Unicode string to a string in which
	// each 16-bit unit occupies only one byte
	// this function basically doubles the length of the supplied string to avoid btoa complaints -- LAME
	Crypt.toBinary = function(key, string) {
		// an array of unsigned 16-bit integers
		const codeUnits = new Uint16Array(string.length);
		for (var i = 0; i < codeUnits.length; i++) {
			// jta added this line to perform the encryption with the key
			codeUnits[i] = Crypt.encryptOneChar(i, key, string.charCodeAt(i));
		}
		return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
	};
	Crypt.fromBinary = function(key, binary) {
		// convert the binary into an array if 8-bit ints
		const bytes = new Uint8Array(binary.length);
		for (var i = 0; i < bytes.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}

		// cast the bytes retrieved as array of 16-bit ints and reverse the offset value derived from the encryption key
		var u16 = new Uint16Array(bytes.buffer);
		for(var i = 0; i < u16.length; i++) {
			u16[i] = Crypt.decryptOneChar(i, key, u16[i]);
		}

		// cast the 16-bit array as a string
		return String.fromCharCode(...u16);
	};

	// returns the charCode from the ith position of the key string, using modulus to cycle thru the key
	Crypt.getKeyOffset = function(i, key) {
		// key is typically shorter than encrypted content, so loop thru the chars of the key using modulus
		var keyI = i % key.length;
		return key.charCodeAt(keyI);
	};
	// encrypts a charCode from the original string using the key
	Crypt.encryptOneChar = function(i, key, charCode) {
		var keyOffset = Crypt.getKeyOffset(i, key);
		// we keyOffset to the data's char code and modulus 65536 to perform the encryption
		const retval = (charCode + keyOffset) % 65536;
		return retval;
	};
	// decrypts one char from the ciphertext to the original string's charCode using the key
	Crypt.decryptOneChar = function(i, key, charCode) {
		var keyOffset = Crypt.getKeyOffset(i, key);
		// we keyOffset to the data's char code and modulus 65536 to perform the encryption
		var retval = (charCode - keyOffset);
		if (keyOffset > charCode) {
			const retval = (charCode - keyOffset) + 65536;
		} else {
			const retval = charCode - keyOffset;
		}
		return retval;
	};
	
	
	// generates a random key of the specified length
	// NOTE this key will be *much* stronger than any ASCII text key
	// because it utilizes the entire number space (1-65535) rather than just 1-127 of ASCII range
	// returns result as a string
	Crypt.generateRandomKey = function(len) {
		const u16 = new Uint16Array(len);
		window.crypto.getRandomValues(u16);
		return String.fromCharCode(...u16);
	};
	
	
	// encrypts data by first converting to JSON
	Crypt.e = function(key, data) {
		return Crypt.staticSymmetricEncryptString(key, JSON.stringify(data));
	};
	Crypt.d = function(key, cipherText) {
		return JSON.parse(Crypt.staticSymmetricDecryptString(key, cipherText));
	};

	
	if(typeof window != "undefined"){
		window.SNEAKYIMP || (window.SNEAKYIMP = {});
		if(window.SNEAKYIMP.Crypt){
			for(var prop in Crypt){
				window.SNEAKYIMP.Crypt[prop] = Crypt[prop];
			}
		} else {
			window.SNEAKYIMP.Crypt = Crypt
		}
	} else {
		throw "'window' not defined. Unable to attach SNEAKYIMP.Crypt";
	}
})();
