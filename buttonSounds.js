const buttonSoundToggle = document.getElementById('buttonSoundToggle');

if (localStorage.getItem('buttonSounds') === 'true' && buttonSoundToggle) {
    buttonSoundToggle.checked = true;
}

if (buttonSoundToggle) {
    buttonSoundToggle.addEventListener('change', () => {
        if (buttonSoundToggle.checked) {
            localStorage.setItem('buttonSounds', 'true');
            enableButtonSounds();
        } else {
            localStorage.setItem('buttonSounds', 'false');
            disableButtonSounds();
        }
    })
}