const startButton = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

startButton.addEventListener('click', () => {
    const startScreen = document.getElementById('overlay');
    startScreen.style.display = 'none';
});