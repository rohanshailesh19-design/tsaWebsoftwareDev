let speech;
//let isDemoPlaying = false;

function readFile () {
    const file = document.getElementById('fileInput').files[0];
    if (!file) { alert("Please upload a file first."); return; }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        document.getElementById('fileContent').textContent = text;

        speech = new SpeechSynthesisUtterance(text);
        isDemoPlaying = true;
        speech.onend = () => isDemoPlaying = false;
        speech.onerror = () => isDemoPlaying = false;
        window.speechSynthesis.speak(speech);
    };
    if (file.type === "text/plain") {
        reader.readAsText(file);
    }else if (file.type === "application/pdf") {
        alert("PDF reading not supported in this demo.");
    } else {
        alert("Unsupported file type. Please upload a .txt file.");
    }
}

function pauseSpeech() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
    }
}

function resumeSpeech() {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
    }
}

function forceStopSpeech() {
    isDemoPlaying = false;
    window.speechSynthesis.cancel();
}