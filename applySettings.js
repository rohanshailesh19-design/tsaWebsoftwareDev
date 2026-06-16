if (localStorage.getItem('reduceMotion') === 'true') {
    document.body.classList.add('reduce-motion');
}

if (localStorage.getItem('dyslexicFont') === 'true') {
    document.body.classList.add('dyslexic-font');
}

if (localStorage.getItem('largeText') === 'true') {
    document.body.classList.add('large-text');
}

function playClick() {
    console.log('click has been fired')
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 1000;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
}

function enableButtonSounds() {
    document.querySelectorAll('button, input').forEach(btn => {
        btn.addEventListener('click', playClick);
    });
}

function disableButtonSounds() {
    document.querySelectorAll('button, input').forEach(btn => {
        btn.removeEventListener('click', playClick);
    });
}

if (localStorage.getItem('buttonSounds') === 'true') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableButtonSounds)
    } else {
        enableButtonSounds();
    }
}