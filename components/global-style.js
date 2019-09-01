import { normalize } from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
    font-family: 'Fenice';
    src: url('FeniceStd-Oblique.eot');
    src: local('FeniceStd-Oblique'),
        url('/static/fonts/FeniceStd-Oblique.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/FeniceStd-Oblique.woff2') format('woff2'),
        url('/static/fonts/FeniceStd-Oblique.woff') format('woff'),
        url('/static/fonts/FeniceStd-Oblique.ttf') format('truetype'),
        url('/static/fonts/FeniceStd-Oblique.svg#FeniceStd-Oblique') format('svg');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Ropa';
    src: url('/static/fonts/RopaSans-Italic.eot');
    src: local('Ropa Sans Italic'), local('RopaSans-Italic'),
        url('/static/fonts/RopaSans-Italic.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/RopaSans-Italic.woff2') format('woff2'),
        url('/static/fonts/RopaSans-Italic.woff') format('woff'),
        url('/static/fonts/RopaSans-Italic.ttf') format('truetype'),
        url('/static/fonts/RopaSans-Italic.svg#RopaSans-Italic') format('svg');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Bangers';
    src: url('/static/fonts/Bangers-Regular.eot');
    src: local('Bangers Regular'), local('Bangers-Regular'),
        url('/static/fonts/Bangers-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Bangers-Regular.woff2') format('woff2'),
        url('/static/fonts/Bangers-Regular.woff') format('woff'),
        url('/static/fonts/Bangers-Regular.ttf') format('truetype'),
        url('/static/fonts/Bangers-Regular.svg#Bangers-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ropa';
    src: url('/static/fonts/RopaSans-Regular.eot');
    src: local('Ropa Sans Regular'), local('RopaSans-Regular'),
        url('/static/fonts/RopaSans-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/RopaSans-Regular.woff2') format('woff2'),
        url('/static/fonts/RopaSans-Regular.woff') format('woff'),
        url('/static/fonts/RopaSans-Regular.ttf') format('truetype'),
        url('/static/fonts/RopaSans-Regular.svg#RopaSans-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lalezar';
    src: url('/static/fonts/Lalezar-Regular.eot');
    src: local('Lalezar-Regular'),
        url('/static/fonts/Lalezar-Regular.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Lalezar-Regular.woff2') format('woff2'),
        url('/static/fonts/Lalezar-Regular.woff') format('woff'),
        url('/static/fonts/Lalezar-Regular.ttf') format('truetype'),
        url('/static/fonts/Lalezar-Regular.svg#Lalezar-Regular') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Erbos';
    src: url('/static/fonts/Erbos-Draco-1st-NBP.eot');
    src: local('Erbos Draco 1st NBP Regular'), local('Erbos-Draco-1st-NBP'),
        url('/static/fonts/Erbos-Draco-1st-NBP.eot?#iefix') format('embedded-opentype'),
        url('/static/fonts/Erbos-Draco-1st-NBP.woff2') format('woff2'),
        url('/static/fonts/Erbos-Draco-1st-NBP.woff') format('woff'),
        url('/static/fonts/Erbos-Draco-1st-NBP.ttf') format('truetype'),
        url('/static/fonts/Erbos-Draco-1st-NBP.svg#Erbos-Draco-1st-NBP') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  .Toastify__toast-container {
    z-index: 9999;
    position: fixed;
    padding: 4px;
    width: 320px;
    box-sizing: border-box;
    color: #fff; }
    .Toastify__toast-container--top-left {
      top: 1em;
      left: 1em; }
    .Toastify__toast-container--top-center {
      top: 1em;
      left: 50%;
      margin-left: -160px; }
    .Toastify__toast-container--top-right {
      top: 1em;
      right: 1em; }
    .Toastify__toast-container--bottom-left {
      bottom: 1em;
      left: 1em; }
    .Toastify__toast-container--bottom-center {
      bottom: 1em;
      left: 50%;
      margin-left: -160px; }
    .Toastify__toast-container--bottom-right {
      bottom: 1em;
      right: 1em; }
  
  @media only screen and (max-width: 480px) {
    .Toastify__toast-container {
      width: 100vw;
      padding: 0;
      left: 0;
      margin: 0; }
      .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {
        top: 0; }
      .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {
        bottom: 0; }
      .Toastify__toast-container--rtl {
        right: 0;
        left: initial; } }
  
  .Toastify__toast {
    text-align: center;
    position: relative;
    min-height: 64px;
    box-sizing: border-box;
    font-weight: normal;
    font-family: 'Ropa';
    margin-bottom: 1rem;
    line-height: 1.3em;
    padding: 8px;
    border-radius: 15px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
        justify-content: space-between;
    max-height: 800px;
    overflow: hidden;
    font-family: sans-serif;
    cursor: pointer;
    direction: ltr; }
    .Toastify__toast--rtl {
      direction: rtl; }
    .Toastify__toast--default {
      background: #fff;
      color: #aaa; }
    .Toastify__toast--info {
      background: #3498db; }
    .Toastify__toast--success {
      background: var(--dark-green); }
    .Toastify__toast--warning {
      background: #f1c40f; }
    .Toastify__toast--error {
      background: var(--bright-red); }
    .Toastify__toast-body {
      font-family: 'Ropa';
      margin: auto 0;
      -ms-flex: 1;
          flex: 1; }
  
  @media only screen and (max-width: 480px) {
    .Toastify__toast {
      margin-bottom: 0; } }
  
  .Toastify__close-button {
    display: none;
    color: #eee;
    font-weight: bold;
    font-size: 14px;
    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.3s ease;
    -ms-flex-item-align: start;
        align-self: flex-start; }
    .Toastify__close-button--default {
      color: #000;
      opacity: 0.3; }
    .Toastify__close-button:hover, .Toastify__close-button:focus {
      opacity: 1; }
  
  @keyframes Toastify__trackProgress {
    0% {
      transform: scaleX(1); }
    100% {
      transform: scaleX(0); } }
  
  .Toastify__progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    z-index: 9999;
    opacity: 0.7;
    background-color: rgba(255, 255, 255, 0.7);
    transform-origin: left; }
    .Toastify__progress-bar--animated {
      animation: Toastify__trackProgress linear 1 forwards; }
    .Toastify__progress-bar--controlled {
      transition: transform .2s; }
    .Toastify__progress-bar--rtl {
      right: 0;
      left: initial;
      transform-origin: right; }
    .Toastify__progress-bar--default {
      background: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55); }
  
  @keyframes Toastify__bounceInRight {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0); }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0); }
    75% {
      transform: translate3d(10px, 0, 0); }
    90% {
      transform: translate3d(-5px, 0, 0); }
    to {
      transform: none; } }
  
  @keyframes Toastify__bounceOutRight {
    20% {
      opacity: 1;
      transform: translate3d(-20px, 0, 0); }
    to {
      opacity: 0;
      transform: translate3d(2000px, 0, 0); } }
  
  @keyframes Toastify__bounceInLeft {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0); }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0); }
    75% {
      transform: translate3d(-10px, 0, 0); }
    90% {
      transform: translate3d(5px, 0, 0); }
    to {
      transform: none; } }
  
  @keyframes Toastify__bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0); }
    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0); } }
  
  @keyframes Toastify__bounceInUp {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
    from {
      opacity: 0;
      transform: translate3d(0, 3000px, 0); }
    60% {
      opacity: 1;
      transform: translate3d(0, -20px, 0); }
    75% {
      transform: translate3d(0, 10px, 0); }
    90% {
      transform: translate3d(0, -5px, 0); }
    to {
      transform: translate3d(0, 0, 0); } }
  
  @keyframes Toastify__bounceOutUp {
    20% {
      transform: translate3d(0, -10px, 0); }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, 20px, 0); }
    to {
      opacity: 0;
      transform: translate3d(0, -2000px, 0); } }
  
  @keyframes Toastify__bounceInDown {
    from,
    60%,
    75%,
    90%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
    0% {
      opacity: 0;
      transform: translate3d(0, -3000px, 0); }
    60% {
      opacity: 1;
      transform: translate3d(0, 25px, 0); }
    75% {
      transform: translate3d(0, -10px, 0); }
    90% {
      transform: translate3d(0, 5px, 0); }
    to {
      transform: none; } }
  
  @keyframes Toastify__bounceOutDown {
    20% {
      transform: translate3d(0, 10px, 0); }
    40%,
    45% {
      opacity: 1;
      transform: translate3d(0, -20px, 0); }
    to {
      opacity: 0;
      transform: translate3d(0, 2000px, 0); } }
  
  .Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {
    animation-name: Toastify__bounceInLeft; }
  
  .Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {
    animation-name: Toastify__bounceInRight; }
  
  .Toastify__bounce-enter--top-center {
    animation-name: Toastify__bounceInDown; }
  
  .Toastify__bounce-enter--bottom-center {
    animation-name: Toastify__bounceInUp; }
  
  .Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {
    animation-name: Toastify__bounceOutLeft; }
  
  .Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {
    animation-name: Toastify__bounceOutRight; }
  
  .Toastify__bounce-exit--top-center {
    animation-name: Toastify__bounceOutUp; }
  
  .Toastify__bounce-exit--bottom-center {
    animation-name: Toastify__bounceOutDown; }
  
  @keyframes Toastify__zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3); }
    50% {
      opacity: 1; } }
  
  @keyframes Toastify__zoomOut {
    from {
      opacity: 1; }
    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3); }
    to {
      opacity: 0; } }
  
  .Toastify__zoom-enter {
    animation-name: Toastify__zoomIn; }
  
  .Toastify__zoom-exit {
    animation-name: Toastify__zoomOut; }
  
  @keyframes Toastify__flipIn {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0; }
    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in; }
    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1; }
    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }
    to {
      transform: perspective(400px); } }
  
  @keyframes Toastify__flipOut {
    from {
      transform: perspective(400px); }
    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1; }
    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0; } }
  
  .Toastify__flip-enter {
    animation-name: Toastify__flipIn; }
  
  .Toastify__flip-exit {
    animation-name: Toastify__flipOut; }
  
  @keyframes Toastify__slideInRight {
    from {
      transform: translate3d(110%, 0, 0);
      visibility: visible; }
    to {
      transform: translate3d(0, 0, 0); } }
  
  @keyframes Toastify__slideInLeft {
    from {
      transform: translate3d(-110%, 0, 0);
      visibility: visible; }
    to {
      transform: translate3d(0, 0, 0); } }
  
  @keyframes Toastify__slideInUp {
    from {
      transform: translate3d(0, 110%, 0);
      visibility: visible; }
    to {
      transform: translate3d(0, 0, 0); } }
  
  @keyframes Toastify__slideInDown {
    from {
      transform: translate3d(0, -110%, 0);
      visibility: visible; }
    to {
      transform: translate3d(0, 0, 0); } }
  
  @keyframes Toastify__slideOutRight {
    from {
      transform: translate3d(0, 0, 0); }
    to {
      visibility: hidden;
      transform: translate3d(110%, 0, 0); } }
  
  @keyframes Toastify__slideOutLeft {
    from {
      transform: translate3d(0, 0, 0); }
    to {
      visibility: hidden;
      transform: translate3d(-110%, 0, 0); } }
  
  @keyframes Toastify__slideOutDown {
    from {
      transform: translate3d(0, 0, 0); }
    to {
      visibility: hidden;
      transform: translate3d(0, 500px, 0); } }
  
  @keyframes Toastify__slideOutUp {
    from {
      transform: translate3d(0, 0, 0); }
    to {
      visibility: hidden;
      transform: translate3d(0, -500px, 0); } }
  
  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {
    animation-name: Toastify__slideInLeft; }
  
  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight; }
  
  .Toastify__slide-enter--top-center {
    animation-name: Toastify__slideInDown; }
  
  .Toastify__slide-enter--bottom-center {
    animation-name: Toastify__slideInUp; }
  
  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {
    animation-name: Toastify__slideOutLeft; }
  
  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight; }
  
  .Toastify__slide-exit--top-center {
    animation-name: Toastify__slideOutUp; }
  
  .Toastify__slide-exit--bottom-center {
    animation-name: Toastify__slideOutDown; }
  
  /*# sourceMappingURL=ReactToastify.css.map */





  :root {
    --dark-blue: #012999;
    --medium-blue: #6189d9;
    --light-blue: #7199df;
    --light-red: #f44540;
    --light-red: #f9b0a5;
    --medium-red: #d42520;
    --dark-red: #940500;
    --bright-red: #f95e5e;
    --light-green: #bbffa6;
    --medium-green: #8be876;
    --dark-green: #489a33;
    --super-light-gray: #eee;
    --very-light-gray: #aaa;
    --light-gray: #808080;
    --medium-gray: #6c6c6c;
    --dark-gray: #1a1a1a;
    --medium-yellow: #fbd84a;
  }

  * {
    box-sizing: border-box;
   } 

  body {
    font-family: 'Ropa';
    color: black;
    background: var(--medium-blue);
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: Bangers;
    font-weight: normal;
  }

  h1 {
    font-size: 1.6em;

    @media (min-width: 600px) {
      font-size: 2em;
    }
  }

  .is-visible {
    opacity: 1 !important;
    transition: opacity .4s ease-in;
  }

  .is-zoomed {
    transform: scale(1.2);

    @media (min-width: 600px) {
      transform: scale(1.4);
    }
  
    @media (min-width: 900px) {
      transform: scale(2);
    }
  }

  .is-correct {
    border-color: var(--dark-green) !important;
    background: var(--super-light-gray) !important;

    div:nth-of-type(1) {
      background-color: var(--dark-green) !important;
      color: var(--super-light-gray) !important;
    }

    div:nth-of-type(2) {
      color: var(--dark-green) !important;
    }
  }

  .is-incorrect {
    border-color: var(--medium-red) !important;
    background: var(--super-light-gray) !important;
    
    div:nth-of-type(1) {
      background-color: var(--medium-red) !important;
      color: var(--super-light-gray) !important;
    }

    div:nth-of-type(2) {
      color: var(--medium-red) !important;
    }
  }

  sub {
    bottom: .15em;
    margin-left: 5px;
    color: var(--dark-blue);
  }

  .highlight > td {
    color: var(--dark-red);
    font-size: 18px;
    font-weight: bold;
  }

  body::-webkit-scrollbar {
    width: .5em;
  }
  
  body::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  
  body::-webkit-scrollbar-thumb {
    background-color: var(--dark-blue);
    outline: 1px solid var(--dark-gray);
  }

  // AddThis
  .at-share-btn-elements {
    text-align: center;
  }
`

export default GlobalStyle