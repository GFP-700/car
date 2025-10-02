let engineSound = null;
let turningSound = null;

function createSound(frequency, type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    return { audioContext, oscillator, gainNode };
}

function playEngineSound(shouldPlay) {
    if (shouldPlay && !engineSound) {
        engineSound = createSound(100, 'sine');
        engineSound.oscillator.start();
    } else if (!shouldPlay && engineSound) {
        engineSound.oscillator.stop();
        engineSound.audioContext.close();
        engineSound = null;
    }
}

function playTurningSound(shouldPlay) {
    if (shouldPlay && !turningSound) {
        turningSound = createSound(200, 'square');
        turningSound.oscillator.start();
    } else if (!shouldPlay && turningSound) {
        turningSound.oscillator.stop();
        turningSound.audioContext.close();
        turningSound = null;
    }
}
