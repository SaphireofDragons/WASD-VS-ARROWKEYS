var canvas = document.getElementById('canvas');
var graphics = canvas.getContext("2d");
var beatCounterDiv = document.getElementById('beatCounter');
var drawFunction = loadingRenderer;
var inactiveArrowImage;
var activeArrowImage;
var ready = false;
//Assign soundIDs
var selectionSoundID = "Select";
var songSID = "Music";

function loadingRenderer() {
  //Begin procedural composition
  //Clear the context
  graphics.clearRect(0, 0, 500, 500);
  //Paint black background
  graphics.fillStyle = "#000000";
  graphics.fillRect(0, 0, 500, 500);
  //Save default state for fallback
  graphics.save();
  //Animation stuff
  var time = new Date();
  graphics.strokeStyle = "#888888";
  graphics.lineWidth = 1;
  graphics.beginPath();
  graphics.arc(250, 250, 100, (.5 * Math.PI), (2 * Math.PI) * (time.getMilliseconds() / 1000));
  graphics.stroke();
  //Draw loading text
  graphics.fillStyle = "#888888";
  graphics.font = "30px Arial";
  graphics.fillText("Loading...", 185, 260);

  //Call update to render
  window.requestAnimationFrame(drawFunction);

  //Check if ready to display menu
  if (ready) {
    drawFunction = menuRenderer;
  }
}

function menuRenderer() {
  //Begin procedural composition
  //Clear the context
  graphics.clearRect(0, 0, 500, 500);
  //Paint black background
  graphics.fillStyle = "#0a0720";
  graphics.fillRect(0, 0, 500, 500);
  //Save default state for fallback
  graphics.save();
  //Animation stuff
  var time = new Date();
  graphics.strokeStyle = "#888888";
  graphics.lineWidth = 1;
  graphics.beginPath();
  var rad = 100 * (time.getMilliseconds() / 1000);
  graphics.arc(250, 250, rad, 0, (2 * Math.PI));
  graphics.stroke();

  //Menu text
  graphics.font = "30px Arial";
  graphics.fillStyle = "#FFFFFF";
  graphics.fillText("Play", 220, 260);

  //Call update to render
  window.requestAnimationFrame(drawFunction);
}

//keyboard input handle for the menu
function menuKeyHandler(event) {
  if (ready) {
    switch (event.keyCode) {
      //Space key
      case 32: {
        startGame();
        break;
      }
      //Enter key
      case 13: {
        startGame();
        break;
      }
      default: {
        break;
      }
    }
  }
  event.preventDefault();
}

//Mouse input for the menu
function menuMouseHandler() {
  startGame();
}

function startGame() {
  //Change renderer
  drawFunction = gameRenderer;
  //Remove old event handlers
  document.removeEventListener("keydown", menuKeyHandler);
  canvas.onclick = null;
  //Add new event handlers
  document.addEventListener("keydown", gameKeyDownHandler, false);
  document.addEventListener("keyup", gameKeyUpHandler, false);
  //Play sound and start the game stage
  createjs.Sound.play(selectionSoundID);
  initPlayStage();
  //Play the main song
  createjs.Sound.play(songSID);
}

function initialize() {
  createjs.Sound.registerSound("audio/sounds/select.wav", selectionSoundID);
  createjs.Sound.registerSound("audio/music/demo.wav", songSID);
  activeArrowImage = new Image();
  inactiveArrowImage = new Image();
  activeArrowImage.src = "images/ArrowActive.png";
  inactiveArrowImage.src = "images/ArrowInactive.png";
}
//Start animation. Loading animation is first
window.requestAnimationFrame(drawFunction);
//Initialize the web application
initialize();
//Assign keyListener
document.addEventListener("keydown", menuKeyHandler, false);
//Assign mouseListener
canvas.onclick = menuMouseHandler;
//Set This should be the last thing to happen
ready = true;
