//preparation

const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = "white";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

ctx.strokestyle = CANVAS_BORDER_COLOUR;

ctx.fillRect (0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

//snake 

let snake = [
    {x: 150, y:150},
    {x: 140, y:150},
    {x: 130, y:150},
    {x: 120, y:150},
    {x: 110, y:150},
];

let difficult = 100;
var dx = 10;
var dy = 0;

var foodX;
var foodY;

let score = document.getElementById('score');
let scoreResult = 0;



//them
/*
createFood();
main();
document.addEventListener('keydown', changeDirection)
*/




function drawSnakePart(snakepart) {
    ctx.fillStyle = '#546de5';
    ctx.strokestyle = '#303952';

    ctx.fillRect(snakepart.x, snakepart.y, 10, 10);
    ctx.strokeRect(snakepart.x, snakepart.y, 10, 10);

}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function advanceSnake() {
    //teleports
    let head;
    //collision with walls
    //right wall
    if (snake[0].x == canvas.width) {
        head  = {x: 0, y: snake[0].y + dy};
    //bottom wall
    } else if (snake[0].y == canvas.height) {
        head = {x: snake[0].x + dx, y: 0};
    //top wall
    } else if (snake[0].y <= 0 && snake[1].y == 10) {
        head = {x: snake[0].x + dx, y: canvas.height - 10};
    //left wall
    } else if (snake[0].x <= 0 && snake[1].x == 10) {
        head  = {x: canvas.width - 10, y: snake[0].y + dy};
    } else {
        head = {x: snake[0].x + dx, y: snake[0].y + dy};
    }
   
    

    snake.unshift(head);

    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        scoreResult += 10;
        score.textContent = scoreResult;
        createFood();
    } else {
        snake.pop();
    }

}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollidge = snake[i].x === snake[0].x &&
        snake[i].y === snake[0].y  
        if (didCollidge) return true;  
    }
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokestyle = 'black';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingDown) {
        dx = 0;
        dy = 10;
    }
}

function main() {
    setTimeout(function onTick() {
        if (didGameEnd()) return endGame();
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, difficult) 
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }
  function createFood() {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);
    snake.forEach(function isFoodOnSnake(part) {
      const foodIsOnSnake = part.x == foodX && part.y == foodY
      if (foodIsOnSnake)
        createFood();
    });
  }

function drawFood() {
 ctx.fillStyle = 'red';
 ctx.strokestyle = 'darkred';
 ctx.fillRect(foodX, foodY, 10, 10);
 ctx.strokeRect(foodX, foodY, 10, 10);
}