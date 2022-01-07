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

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomPhrase = (arr) => phrases[getRandomIndex(arr)];

function getRandomPhraseAsArray(arr) {
    const phraseToGuess = getRandomPhrase(arr);
    const phraseLetters = phraseToGuess.split('');
    return phraseLetters;
}
getRandomPhraseAsArray(phrases);
