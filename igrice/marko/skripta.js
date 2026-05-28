//Define HTML elements
const board=document.getElementById('game-board');
const instructions=document.getElementById('instruction-text');
const score=document.getElementById('score');    
const highscore=document.getElementById('highscore')

//Define game variables
let snake=[{x:10,y:10}];
let food= generateFood();
let direction='right';
let gameInterval;
let gameSpeed=200;
let gameStarted=false;
let gameEnded=false;
//Draw game map,snake,food
function draw(){
    board.innerHTML='';
    drawSnake();
    drawFood();
}

//Draw snake
function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement=createGameElement('div','snake');
        setPosition(snakeElement,segment);
        board.appendChild(snakeElement);
    });
}

//Create a snake or food cubr/div
function createGameElement(tag,className){
    const element=document.createElement(tag);
    element.className=className;
    return element;
}

//Set position of snake or food
function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

//drawFood
function drawFood(){
    const foodElement=createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

//Generate food
function generateFood(){
    const x=Math.floor(Math.random()*20)+1;
    const y=Math.floor(Math.random()*20)+1;
    if(snake.some(segment=>segment.x===x && segment.y===y)){
        return generateFood();
    }
    return{x,y};
}

//Moving the snake
function moveSnake(){
    const head={...snake[0]};
    switch(direction){
        case'right':
            head.x++;
            break;
        case'left':
            head.x--;
            break;
        case'up':
            head.y--;
            break;
        case'down':
            head.y++;
            break;
    }
    snake.unshift(head);
    if(head.x==food.x && head.y==food.y){
        updateScore();
        food=generateFood();
        decreaseSpeed();
        clearInterval(gameInterval);
        gameInterval=setInterval(()=>{
            moveSnake();
            checkCollision();
            draw();
        },gameSpeed);
    }
    else snake.pop();

}

//start game
function startGame(){
    gameStarted=true;
    instructions.style.display='none';
    gameInterval=setInterval(()=>{
        moveSnake();
        checkCollision();
        draw();
    },gameSpeed)
}

//keypress event listener
function handleKeyPress(event){
    if(((!gameStarted && event.code==='Space')||
    (!gameStarted && event.key===' ') ) && gameEnded===false) {startGame();}
    else if(((!gameStarted && event.code==='Space')||
    (!gameStarted && event.key===' ') ) && gameEnded===true){
        snake=[{x:10,y:10}];
        food= generateFood();
        direction='right';
        gameSpeed=200;
        gameEnded=false;
        startGame();
    }
    
    else{
        switch(event.key){
            case'ArrowUp':
            if(direction!=='down')
            direction='up';
            break;
            case'ArrowDown':
            if(direction!=='up')
            direction='down';
            break;
            case'ArrowLeft':
            if(direction!=='right')
            direction='left';
            break;
            case'ArrowRight':
            if(direction!=='left')
            direction='right';
            break;
        }
    }
}
document.addEventListener('keydown',handleKeyPress);

function decreaseSpeed(){
    console.log(gameSpeed);
    if(gameSpeed>150){
        gameSpeed-=5;
    }
    else if (gameSpeed>100){
        gameSpeed-=3;
    }
    else if (gameSpeed>50){
        gameSpeed-=2;
    }
    else if (gameSpeed>25){
        gameSpeed-=1;
    }
}

function checkCollision(){
    const head=snake[0];

    if(head.x<1 || head.x>20||head.y<1||head.y>20){
        endGame();
    }
    for(let i=1;i<snake.length;i++){
        if(head.x==snake[i].x&&head.y==snake[i].y){
            endGame();
        }
    }
}

function endGame(){
    updateHighScore();
    clearInterval(gameInterval);
    gameStarted=false;
    instructions.textContent='Game Over! Press Space to restart.';
    instructions.style.display='block';
    gameEnded=true;
}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');
}

function updateHighScore(){
    const currentScore=snake.length-1;
    const highScoreValue=parseInt(highscore.textContent);
    if(currentScore>highScoreValue){
        highscore.textContent=currentScore.toString().padStart(3,'0');
    }
}