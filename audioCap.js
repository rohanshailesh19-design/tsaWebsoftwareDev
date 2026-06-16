document.getElementById('audioInput').addEventListener('change', e => {
    const audio = document.getElementById('audio');
    audio.src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('audioCaptionInput').addEventListener('change', e => {
    const reader = new FileReader();
    reader.onload = () => {
        const container = document.getElementById('audioFileContent');
        container.textContent = reader.result;
        container.focus();
    };
    reader.readAsText(e.target.files[0]);
});