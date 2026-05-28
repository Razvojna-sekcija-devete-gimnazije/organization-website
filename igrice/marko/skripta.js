const tabla = document.getElementById('tabla');
const instrukcija = document.getElementById('instrukcija');
const score = document.getElementById('score');    
const highscore = document.getElementById('highscore');

let zmija = [{ x: 10, y: 10 }];
let hrana = generisiHranu();
let smer = 'right';
let intervalIgre;
let brzina = 200;
let igraPocela = false;
let igraZavrsena = false;

function Nacrtaj() {
    tabla.innerHTML = '';
    nacrtajZmiju();
    nacrtajHranu(); 
}

function nacrtajZmiju() {
    zmija.forEach((segment) => {
        const snakeElement = napraviElement('div', 'zmija');
        postaviPoziciju(snakeElement, segment);
        tabla.appendChild(snakeElement);
    });
}

function napraviElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function postaviPoziciju(element, pozicija) {
    element.style.gridColumn = pozicija.x;
    element.style.gridRow = pozicija.y;
}

function nacrtajHranu() {
    const elementHrane = napraviElement('div', 'hrana');
    postaviPoziciju(elementHrane, hrana);
    tabla.appendChild(elementHrane);
}

function generisiHranu() {
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    if (zmija.some(segment => segment.x === x && segment.y === y)) {
        return generisiHranu();
    }
    return { x, y };
}

function kretanjeZmije() {
    //plitka kopija
    const glava = { ...zmija[0] };
    switch (smer) {
        case 'right': glava.x++; break;
        case 'left': glava.x--; break;
        case 'up': glava.y--; break;
        case 'down': glava.y++; break;
    }
    zmija.unshift(glava);
    if (glava.x == hrana.x && glava.y == hrana.y) {
        updateScore();
        hrana = generisiHranu();
        SmanjiBrzinu();
        clearInterval(intervalIgre);
        intervalIgre = setInterval(() => {
            kretanjeZmije();
            daLiDodiruje();
            Nacrtaj();
        }, brzina);
    }
    else zmija.pop();
}

function kreniIgru() {
    igraPocela = true;
    instrukcija.style.display = 'none';
    intervalIgre = setInterval(() => {
        kretanjeZmije();
        daLiDodiruje();
        Nacrtaj();
    }, brzina);
}

function handleKeyPress(event) {
    if (((!igraPocela && event.code === 'Space') || (!igraPocela && event.key === ' ')) && igraZavrsena === false) { 
        kreniIgru(); 
    }
    else if (((!igraPocela && event.code === 'Space') || (!igraPocela && event.key === ' ')) && igraZavrsena === true) {
        zmija = [{ x: 10, y: 10 }];
        hrana = generisiHranu();
        smer = 'right';
        brzina = 200;
        igraZavrsena = false;
        updateScore();
        kreniIgru();
    }
    else {
        switch (event.key) {
            case 'ArrowUp': if (smer !== 'down') smer = 'up'; break;
            case 'ArrowDown': if (smer !== 'up') smer = 'down'; break;
            case 'ArrowLeft': if (smer !== 'right') smer = 'left'; break;
            case 'ArrowRight': if (smer !== 'left') smer = 'right'; break;
        }
    }
}
document.addEventListener('keydown', handleKeyPress);

function SmanjiBrzinu() {
    if (brzina > 150) { brzina -= 5; }
    else if (brzina > 100) { brzina -= 3; }
    else if (brzina > 50) { brzina -= 2; }
    else if (brzina > 25) { brzina -= 1; }
}

function daLiDodiruje() {
    const glava = zmija[0];

    if (glava.x < 1 || glava.x > 20 || glava.y < 1 || glava.y > 20) {
        KrajIgre();
    }
    for (let i = 1; i < zmija.length; i++) {
        if (glava.x == zmija[i].x && glava.y == zmija[i].y) {
            KrajIgre();
        }
    }
}

function KrajIgre() {
    updateHighScore();
    clearInterval(intervalIgre);
    igraPocela = false;
    instrukcija.textContent = 'Game Over! Press Space to restart.';
    instrukcija.style.display = 'block';
    igraZavrsena = true;
}

function updateScore() {
    const currentScore = zmija.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
    const currentScore = zmija.length - 1;
    const highScoreValue = parseInt(highscore.textContent) || 0; 
    if (currentScore > highScoreValue) {
        highscore.textContent = currentScore.toString().padStart(3, '0');
    }
}