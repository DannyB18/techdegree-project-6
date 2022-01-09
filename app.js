let missed = 0;

const startScreen = document.getElementById('overlay');4
const startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const keyboard = document.getElementById('qwerty');
const letterButtons = document.getElementsByTagName('button');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const ol = scoreboard.firstElementChild;
const lives = ol.querySelectorAll('.tries');
let phrases = [
    'THE EARLY BIRD CATCHES THE WORM',
    'START OFF ON THE RIGHT FOOT',
    'WHAT GOES UP MUST COME DOWN',
    'MAY THE FORCE BE WITH YOU',
    'KNOCKED IT OUT OF THE PARK'
];
let usedPhrases = [];

function createLI(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
    return li;
}

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    if (startButton.textContent === 'Play Again') {
        resetGame();
    } else if (startButton.textContent === 'Start Over?') {
        phrases = usedPhrases;
        usedPhrases = [];
        resetGame();
    }
});

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomPhrase = (arr) => phrases[getRandomIndex(arr)];

addPhraseToDisplay(phrases);

function getRandomPhraseAsArray(arr) {
    const phraseToGuess = getRandomPhrase(arr);
    const phraseLetters = phraseToGuess.split('');
    const index = phrases.indexOf(phraseToGuess);
    usedPhrases.push(phraseToGuess);
    phrases.splice(`${index}`, '1');
    return phraseLetters;
}

function addPhraseToDisplay(arr) {
    const phraseLetters = getRandomPhraseAsArray(arr);
    for (let i = 0; i < phraseLetters.length; i++) {
        const character = phraseLetters[i];
        const listItem = createLI(character);
        if (character === ' ') {
            listItem.className = 'space';
        } else {
            listItem.className = 'letter';
        }
        phrase.firstElementChild.appendChild(listItem);
    }
}

let letterFound;
function checkLetter(button) {
    const letterClassArray = document.getElementsByClassName('letter');
    const letterArray = [];
    for (let i = 0; i < letterClassArray.length; i++) {
            const letterSpace = letterClassArray[i];
            const letter = letterSpace.firstChild.textContent.toLowerCase();
            letterArray.push(letter);
            if (letterArray.includes(button)) {
                for (let i = 0; i < letterArray.length; i++) {
                    if (button === letter) {
                        letterSpace.classList.add('show');
                        letterFound = letter;
                    }
                }
            } else {
                letterFound = null;
            }
    }
}

const endScreen = (wl) => {
    startScreen.className = wl;
    startScreen.style.display = 'flex';
    title.textContent = `YOU ${wl.toUpperCase()}!`;
    const shown = document.querySelectorAll('.show');
    for (let i = 0; i < shown.length;  i++) {
        shownLetter = shown[i];
        shownLetter.classList.remove('show');
    }
    if (startScreen.style.display === 'flex' && phrases.length === 0) {
        const outOfPhrases = document.createElement('h3');
        outOfPhrases.textContent = 'There are no more phrases'
        startScreen.insertBefore(outOfPhrases, startButton);
        startButton.textContent = 'Start Over?'
    } else {
        startButton.textContent = 'Play Again';
    }
};

function checkWin() {
    const shownLetters = document.querySelectorAll('.show');
    const letters = document.querySelectorAll('.letter');
    if (shownLetters.length === letters.length) {
        endScreen('win');
    } else if (missed >= lives.length) {
        endScreen('lose');
    }
}

const changeHearts = () => {
    const livesLeft = lives.length - missed;
    if (livesLeft === lives.length) {
        for (let i = 0; i < lives.length; i++) {
            const life = lives[i];
            const heart = life.firstChild;
            life.classList.remove('lost');
            heart.setAttribute('src', 'images/liveHeart.png');
        }
    } else if (missed > 0) {
        const currentLife = lives[livesLeft];
        const currentHeart = currentLife.firstChild;
        currentLife.classList.add('lost');
        currentHeart.setAttribute('src', 'images/lostHeart.png');
        console.log(currentHeart);
    }
}

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        checkLetter(button.textContent);
        button.className = 'chosen';
        button.setAttribute('disabled', 'true');
        if (letterFound === null) {
            missed++;
            changeHearts();
        }
    checkWin();
    }
});

const resetButtons = () => {
    for (let i = 0; i < letterButtons.length; i++) {
        const button = letterButtons[i];
        if (button.className === 'chosen') {
            button.removeAttribute('class');
            button.removeAttribute('disabled');
        }
    }
};

function resetGame() {
    missed = 0;
    phrase.innerHTML = `<ul></ul>`;
    changeHearts();
    resetButtons();
    addPhraseToDisplay(phrases);
}