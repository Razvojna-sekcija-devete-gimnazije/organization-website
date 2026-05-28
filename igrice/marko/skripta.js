//Define HTML elements
const board=document.getElementById('game-board');
const instructions=document.getElementById('instruction-text');


//Define game variables
let snake=[{x:10,y:10}];
let food= generateFood();
let direction='right';
let gameInterval;
let gameSpeed=200;
let gameStarted=false;

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
        food=generateFood();
        clearInterval(gameInterval);
        gameInterval=setInterval(()=>{
            moveSnake();
            //checkCollision();
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
        //checkCollision();
        draw();
    },gameSpeed)
}

//keypress event listener
function handleKeyPress(event){
    if((!gameStarted && event.code==='Space')||
    (!gameStarted && event.key===' ') ) {startGame();}
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