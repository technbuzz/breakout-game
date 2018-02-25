let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let ballColor = "#0095DD";

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let leftPressed = false;
let rightPressed = false;

const brickRowCount = 3;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];

for (let col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];
  for (let row = 0; row < brickRowCount; row++) {
    bricks[col][row] = {x:0, y: 0, status: 1}
  }
}

function drawBricks(){
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if(bricks[col][row].status){

        let brickX = (col * (brickWidth+brickPadding) + brickOffsetLeft);
        let brickY = (row * (brickHeight+brickPadding) + brickOffsetTop);
        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      } //if bricks.status
    } // loop rows 
  } // loop cols
} // drawBricks


function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();

  if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
    dx = -dx;
  }

  if (ballY + dy < ballRadius) {
    dy = -dy;
  } else if (ballY + dy > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
  } else if(leftPressed && paddleX > 0){
    paddleX -= 7;
  }
  ballX += dx;
  ballY += dy;
}

function collisionDetection(){
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      let b = bricks[col][row];
      if(b.status){
        if(ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount){
            alert("YOU WIN, CONGRATS");
            document.location.reload();
          }
        }
      }
    }
  }
}


function keyDownHandler(e) {
  if(e.keyCode === 39){
    rightPressed = true;
  } else if (e.keyCode === 37){
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 39){
    rightPressed = false;
  } else if (e.keyCode === 37){
    leftPressed = false;
  }
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


setInterval(draw, 10);
