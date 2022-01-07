const startButton = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const phrases = [
    'THE EARLY BIRD CATCHES THE WORM',
    'START OFF ON THE RIGHT FOOT',
    'WHAT GOES UP MUST COME DOWN',
    'MAY THE FORCE BE WITH YOU',
    'KNOCKED IT OUT OF THE PARK'
];

startButton.addEventListener('click', () => {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = 'none';
});

function getRandomIndex(arr) {
    const number = Math.floor(Math.random() * arr.length);
    return number;
}

function getRandomPhrase(arr) {
    const index = getRandomIndex(arr)
    const phraseToGuess = phrases[index];
    return phraseToGuess;
}

const phraseToGuess = getRandomPhrase(phrases);
