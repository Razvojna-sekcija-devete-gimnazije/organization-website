const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const rulesText = document.querySelector('#rulesText'); 

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const rulesList = [
    {
        name: "Standardna pobeda (3 ista u nizu)",
        check: (a, b, c, igrac) => a === igrac && b === igrac && c === igrac
    },
    {
        name: "Sendvic runda (Zapocni i zavrsi niz, npr. O-X-O)",
        check: (a, b, c, igrac) => {
            const protivnik = igrac === "O" ? "X" : "O";
            return a === igrac && b === protivnik && c === igrac;
        }
    },
    {
        name: "Uljez runda (Bilo koja 2 tvoja i 1 protivnicki simbol)",
        check: (a, b, c, igrac) => {
            const niz = [a, b, c];
            const tvoji = niz.filter(s => s === igrac).length;
            const protivnicki = niz.filter(s => s === (igrac === "O" ? "X" : "O")).length;
            return tvoji === 2 && protivnicki === 1;
        }
    },
    {
        name: "Pacifista (Zauzmi 4 polja, ali tako da NE SPOJIS 3 ista - ko spoji 3, GUBI!)",
        check: () => true
    },
    {
        name: "Zid (Pobedjuju SAMO spoljne ivice table - dijagonale i centar se ne racunaju!)",
        check: (a, b, c, igrac) => a === igrac && b === igrac && c === igrac
    }
];

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "O";
let running = false;
let currentRule;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    pickRandomRule();
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function pickRandomRule() {
    const rndIndex = Math.floor(Math.random() * rulesList.length);
    currentRule = rulesList[rndIndex];
    if(rulesText) {
        rulesText.textContent = `Cilj runde: ${currentRule.name}`;
    }
}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    if(options[cellIndex] != '' || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "O") ? "X" : "O";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;
    let roundLost = false;

    if(currentRule && currentRule.name.includes("Pacifista")) {
        let spojioTri = false;
        for(let i = 0; i < winConditions.length; i++) {
            const cond = winConditions[i];
            if(options[cond[0]] === currentPlayer && options[cond[1]] === currentPlayer && options[cond[2]] === currentPlayer) {
                spojioTri = true;
                break;
            }
        }

        if(spojioTri) {
            roundLost = true;
        } else {
            const ukupnoTvojih = options.filter(s => s === currentPlayer).length;
            if(ukupnoTvojih >= 4) {
                roundWon = true;
            }
        }
    } 
    else {
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];    

            if(currentRule && currentRule.name.includes("Zid")) {
                if(i === 1 || i === 4 || i === 6 || i === 7) {
                    continue; 
                }
            }

            if(currentRule && (currentRule.name.includes("Standardna") || currentRule.name.includes("Sendvic"))) {
                if(cellA == '' || cellB == '' || cellC == '') {
                    continue;
                }
            }

            if(currentRule && currentRule.check(cellA, cellB, cellC, currentPlayer)){
                roundWon = true;
                break;
            }
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(roundLost){
        const pobednik = currentPlayer === "O" ? "X" : "O";
        statusText.textContent = `${pobednik} wins! (Pacifista kazna)`;
        running = false;
    }
    else if(!options.includes('')){
        statusText.textContent = `Draw!`;
        running = false;
    }else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "O";
    options = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    pickRandomRule();
    running = true;
}
