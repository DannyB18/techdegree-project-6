const startButton = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
// const li = document.createElement('li');

let missed = 0;
const phrases = [
    'THE EARLY BIRD CATCHES THE WORM',
    'START OFF ON THE RIGHT FOOT',
    'WHAT GOES UP MUST COME DOWN',
    'MAY THE FORCE BE WITH YOU',
    'KNOCKED IT OUT OF THE PARK'
];

function createLI(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
    return li
}

startButton.addEventListener('click', () => {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = 'none';
});

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomPhrase = (arr) => phrases[getRandomIndex(arr)];

function getRandomPhraseAsArray(arr) {
    const phraseToGuess = getRandomPhrase(arr);
    const phraseLetters = phraseToGuess.split('');
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
            listItem.className = 'letter'
        }
        phrase.appendChild(listItem);
    }
}
addPhraseToDisplay(phrases);

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

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        checkLetter(button.textContent);
        button.className = 'chosen';
        button.setAttribute('disabled', 'true')
        if (letterFound === null) {
            missed++; 
        }
    }
});