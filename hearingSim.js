localStorage.removeItem('quizScores')

const sentences = [
    "This place is a very lovely beach.",
    "The island is very isolated.",
    "The quick brown fox jumps over the lazy dog.",
    "I'm going to go shopping for some carrots soon.",
];

let randomSelection = sentences[Math.floor(Math.random()*sentences.length)];

const synth = window.speechSynthesis;
const total = 4;
document.getElementById('progressMeter').textContent = `Question ${total - sentences.length + 1} of ${total}`;
updateProgressBar()
let results = document.getElementById("results")
let scores = [];
let questionsCorrect = 0;

function askSentence(sentence) {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.4;

    synth.speak(utterance);
};


function checkAnswer() {
    synth.cancel()
    if (sentences.length === 0) {
        results.innerHTML = "You've completed all the questions. Thank you for playing!"
        return;
    }

    const answer = document.getElementById("answerBox").value.trim();
    const origPrompt = randomSelection;

    const cleanAnswer = answer.trim().toLowerCase();
    const cleanPrompt = origPrompt.trim().toLowerCase();

    const answerWords = cleanAnswer.split(' ');
    const promptWords = cleanPrompt.split(' ');

    if (answer === '') {
        results.innerHTML = "Please type an answer first.";
        return;
    }

    document.getElementById("answerBox").disabled = true;

    if (cleanAnswer === cleanPrompt) {
        results.innerHTML = "Congrats! You got this prompt correct!";
        scores.push(100);
        questionsCorrect++;
    
        if (sentences.length === 0) {
            document.getElementById('nextQuestion').style.display = 'none';
        } else {
            document.getElementById('nextQuestion').style.display = 'block';
        };
    
    } else if (answerWords.length > promptWords.length) {
        let totalRight = 0;
        let tempPrompt = [...promptWords]

        for (let i = 0; i < answerWords.length; i++) {
            const index = tempPrompt.indexOf(answerWords[i]);
            if (index > -1) {
                totalRight ++;
                tempPrompt[index] = ' '
            }
        }

        const score = Math.round((totalRight / answerWords.length)*100);
        const wrong = answerWords.length - totalRight;
        results.innerHTML = `You got ${score}% correct! (${wrong} word(s) wrong.) The original sentence was: "${origPrompt}"`;
        scores.push(score);
        if (score >= 80) questionsCorrect++;

        if (sentences.length === 0) {
            document.getElementById('nextQuestion').style.display = 'none';
        } else {
            document.getElementById('nextQuestion').style.display = 'block';
        };

    } else {
        const maxLen = Math.max(answerWords.length, promptWords.length);
        let debounce = 0;

        for (let i = 0; i < maxLen; i++) {
            if (answerWords[i] !== promptWords[i]) {
                debounce ++;
            }
        }

        const totalWords = promptWords.length;
        const score = Math.round(((totalWords - debounce) / totalWords) * 100);
        results.innerHTML = `You got ${score}% correct! (${debounce} word(s) wrong.) The original sentence was: "${origPrompt}"`;
        scores.push(score);
        if (score >= 80) questionsCorrect++;

        if (sentences.length === 0) {
            document.getElementById('nextQuestion').style.display = 'none';
        } else {
            document.getElementById('nextQuestion').style.display = 'block';
        };
    }
};

function nextQuestion() {
    synth.cancel()
    document.getElementById("answerBox").disabled = false;
    const index = sentences.indexOf(randomSelection);
    if (index > -1) {
        sentences.splice(index, 1);
    }
    
    document.getElementById('progressMeter').textContent = `Question ${total - sentences.length + 1} of ${total}`;
    updateProgressBar()

    if (sentences.length === 0) {
        localStorage.setItem('quizScores', JSON.stringify(scores));
        localStorage.setItem('questionsCorrect', questionsCorrect)
        localStorage.setItem("totalQuestions", total)
        localStorage.setItem('lastTest', 'hearing');

        results.innerHTML = "You've completed all the questions. Click the button to see your report.";
        
        document.getElementById('nextQuestion').style.display = 'block';
        document.getElementById('nextQuestion').textContent = 'Open Report';
        document.getElementById('nextQuestion').onclick = () => {
            window.location.href = 'report.html'
        };


        document.getElementById('progressMeter').textContent = `Question ${total - sentences.length} of ${total}`;
        
        document.getElementById('checktheAnswer').disabled = true;
        document.getElementById('checktheAnswer').style.opacity = '0.5';

        document.getElementById('sounder').disabled = true;
        document.getElementById('sounder').style.opacity = '0.5';

        document.getElementById("answerBox").disabled = true;
        document.getElementById("answerBox").value = ""
        return;
    }

    randomSelection = sentences[Math.floor(Math.random()*sentences.length)];
    document.getElementById("answerBox").value = '';
    results.innerHTML = '';
    document.getElementById('nextQuestion').style.display = 'none';
};

function updateProgressBar() {
    const completed = total - sentences.length;
    const percent  = Math.round((completed / total) * 100);
    document.getElementById('progressBarFill').style.width = `${percent}%`;
}