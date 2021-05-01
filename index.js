let {body} = document;

//Creation Canvas
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');


let paddleWidth = 100;
let paddleHeight = 10;
let canvasWidth = 500;
let canvasHeight = 700;
let paddleTopX = 200;
let paddleBottomX = 200;
let ballXposition = 250;
let ballYPosition = 350;
const ballRadius = 10;
let playerScore = 0;
let computerScore = 0;


// Renders the initial canvas.
function renderCanvas() {
// Canvas background
context.fillStyle = 'black';
context.fillRect(0,0, canvasWidth, canvasHeight);
//Paddle color
context.fillStyle = 'white';
//Comp Player paddle
context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);
//Player paddle
context.fillRect(paddleBottomX, canvasHeight - 20, paddleWidth, paddleHeight);

//Center Dashed line.
context.beginPath();
context.moveTo(0, 350);
context.setLineDash([4]);
context.lineTo(canvasWidth, 350);
context.strokeStyle = 'grey';
context.stroke();

//Draw ball.
context.beginPath();
context.arc(ballXposition, ballYPosition, ballRadius, 0, 2* Math.PI);
context.fill();

//Draw
context.font = '22px Courier New';
context.fillText(playerScore,0, canvasHeight / 2 - 30);
context.fillText(computerScore,0, (canvasHeight / 2) + 40);
}
// Appends canvas into the DOM.
function appendCanvasElement() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    body.appendChild(canvas);
    renderCanvas();
}

appendCanvasElement();