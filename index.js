
let {body} = document;

let parentElement = document.createElement('div');
//Creation Canvas
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');


let paddleWidth = 50;
let paddleDifference =25; 
let paddleHeight = 10;
let canvasWidth;
let canvasHeight;
let paddleTopX = 155;
let paddleBottomX = 155;
let ballXposition = 175;
let ballYPosition = 300;
const ballRadius = 5;
const screenWidth = window.innerWidth;
let canvasPosition = undefined;
let playerScore = 0;
let computerScore = 0;

//Speed controlling for ball and top paddle
let speedX = -1;
let speedY = -1;
let computerSpeed;

let isBallContactedWithPaddle;
let hasUserMovedPaddle;


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
context.moveTo(0,canvasHeight / 2);
context.setLineDash([4]);
context.lineTo(canvasWidth, canvasHeight / 2);
context.strokeStyle = 'grey';
context.stroke();

//Draw ball.
context.beginPath();
console.log(ballXposition , ballYPosition);
context.arc(ballXposition, ballYPosition, ballRadius, 0, 2* Math.PI);
context.fill();

//Draw
context.font = '22px Courier New';
context.fillText(computerScore,0, canvasHeight / 2 - 30);
context.fillText(playerScore,0, (canvasHeight / 2) + 40);
}
// Appends canvas into the DOM.
function appendCanvasElement() {
    parentElement.style.width = '350px';
    parentElement.style.height = '600px';
    body.appendChild(parentElement);
    let boundingRect = parentElement.getBoundingClientRect();
    let displayPixelRatio = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = boundingRect.width;
    canvas.height = boundingRect.height;
    canvas.style.width = boundingRect.width;
    canvas.style.height = boundingRect.height;
    canvasWidth = boundingRect.width;
    canvasHeight = boundingRect.height;
    //For body tag, we justified contents so to get canvas start position we are differencing screen center position with
    // canvas half part . that will be the canvas position.
    canvasPosition = screenWidth / 2 - canvasWidth / 2;
    parentElement.appendChild(canvas);
}
//On refresh we are re-initializing the ball and paddle position. 
function resetBallToInitialPosition() {
    ballXposition = canvasWidth / 2;
    ballYPosition = canvasHeight / 2;
    speedY = -3;
    paddleTopX = ballXposition - paddleDifference;
    hasUserMovedPaddle = false;
    isBallContactedWithPaddle = false;
}
//Method which controls ball movement.
function ballMovement() {
    ballYPosition  += speedY;
    if(hasUserMovedPaddle && isBallContactedWithPaddle) {
     ballXposition += speedX;
    }
}
// Method controlling ball movement when it comes in contact or croseed the paddle.
function checkBallBoudries() {
    if(ballXposition < 0 || ballXposition > canvasWidth)
      speedX = -speedX; 
    // If ball made contact with top paddle
    if(ballYPosition < paddleDifference) {
     if (ballXposition > paddleTopX && ballXposition <= paddleTopX + paddleWidth) {
         speedY = -speedY;
         if (hasUserMovedPaddle) {
             speedY += 1;
             if (speedY > 5)
             speedY = 5;
         }

     } else if (ballYPosition <= 0) {
         playerScore++;
         resetBallToInitialPosition();
     }
    }
    // If ball made contact with bottom paddle
    else if(ballYPosition > canvasHeight - paddleDifference) {
        if (ballXposition > paddleBottomX && ballXposition <= paddleBottomX + paddleWidth) {
            isBallContactedWithPaddle = true;
            speedY = -speedY;
            if(hasUserMovedPaddle) {
                speedY -= 1;
                if(speedY < -5) {
                    speedY = -5;
                }
            }
            let pathPoint = ballXposition - (paddleBottomX + paddleDifference);
            speedX = pathPoint * 0.2;
        } else if( ballYPosition >= canvasHeight) {
            computerScore++;
            resetBallToInitialPosition();
        }
    }
}
// Method controlling computer player.
function compPlayer() {
    if(hasUserMovedPaddle && isBallContactedWithPaddle) {
        paddleTopX += speedX > 0 ? speedX - 0.1 : speedX + 0.1;
    }
}
//Method which contains required functionalities to re-paint on every refresh.
function animateFrame() {
    renderCanvas();
    ballMovement();
    checkBallBoudries();
    compPlayer();
    window.requestAnimationFrame(animateFrame);
}
// Game start.
function gameStart() {
    playerScore = 0;
    computerScore = 0;
    hasUserMovedPaddle = false;
    isBallContactedWithPaddle = false;
    appendCanvasElement();
    resetBallToInitialPosition();
    animateFrame();
    canvas.addEventListener('mousemove', (e) => {
        hasUserMovedPaddle = true;
        paddleBottomX = e.clientX - canvasPosition;
        if (paddleBottomX < 0)
            paddleBottomX = 0;
        //To stop paddle movement at end of canvas.
        else if (paddleBottomX > canvasWidth -paddleWidth )
            paddleBottomX = canvasWidth -paddleWidth;
        canvas.style.cursor = 'none';
    })
}

//On Load
gameStart();

// On Resize
window.addEventListener('resize', () => {
    canvasPosition = window.innerWidth / 2 - canvasWidth /2;
})