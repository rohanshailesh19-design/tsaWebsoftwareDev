const filters = [
    'blur(3px)',
    'contrast(0.4) brightness(1.2)',
    'grayscale(100%)',
    'blur(2px) contrast(0.5) brightness(0.8)'
];

const visualSentences = [
    'The quick brown fox jumps over the lazy dog.',
    "I'm going to go shopping soon because I want vegetables.",
    'The pizza store is going to close soon.',
    'I really like this show because the story is wonderful.'
]

let currentVS = visualSentences[Math.floor(Math.random() * visualSentences.length)];
const visualTotal = 4;
let visualScores = [];
let visualQuestionsCorrect = 0;
let vResults = document.getElementById('vresults');

document.getElementById('vprogressMeter').textContent = `Question ${visualTotal - visualSentences.length + 1} of ${visualTotal}`;
updateVisualProgressBar();

function loadVisualQuestion() {
    const display = document.getElementById('sentenceDisplay');
    display.textContent = currentVS;
    const randomFilter = filters[Math.floor(Math.random() * filters.length)];
    display.style.filter = randomFilter;
}

loadVisualQuestion();

function checkVisualAnswer() {
    if (visualSentences.length === 0) {
        vResults.innerHTML = "You've completed all the questions. Thank you for playing!"
        return;
    }

    const answer = document.getElementById('vanswerBox').value.trim()

    if (answer === '') {
        vResults.innerHTML = 'Please type an answer first.';
        return;
    }

    document.getElementById('vanswerBox').disabled = true;

    const cleanAnswer = answer.toLowerCase();
    const cleanPrompt = currentVS.toLowerCase();

    const answerWords = cleanAnswer.split(' ');
    const promptWords = cleanPrompt.split(' ');

    if (cleanAnswer === cleanPrompt) {
        vResults.innerHTML = "Congrats! You got this prompt correct!";
        visualScores.push(100);
        visualQuestionsCorrect++;
    } else if (answerWords.length > promptWords.length) {
        let totalRight = 0;
        let tempPrompt = [...promptWords]

        for (let i=0; i < answerWords.length; i++) {
            const index = tempPrompt.indexOf(answerWords[i]);
            if (index > -1) {
                totalRight++;
                tempPrompt[index] = ' ';
            }
        }

        const score = Math.round((totalRight / answerWords.length)*100);
        const wrong = answerWords.length - totalRight;
        vResults.innerHTML = `You got ${score}% correct! (${wrong} word(s) wrong.) The original sentence was: "${currentVS}"`;
        visualScores.push(score);
        if (score >= 80) visualQuestionsCorrect++;
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
        vResults.innerHTML = `You got ${score}% correct! (${debounce} word(s) wrong.) The original sentence was: "${currentVS}"`;
        visualScores.push(score);
        if (score >= 80) visualQuestionsCorrect++;
    }

    document.getElementById('vnextQuestion').style.display = 'block';
}

function nextVisualQuestion() {
    document.getElementById('vanswerBox').disabled = false;
    const index = visualSentences.indexOf(currentVS);
    if (index > -1) visualSentences.splice(index, 1);

    if (visualSentences.length === 0) {
        document.getElementById('vprogressMeter').textContent = `Question ${visualTotal} of ${visualTotal}`;
        updateVisualProgressBar();

        localStorage.setItem('visualScores', JSON.stringify(visualScores));
        localStorage.setItem('visualQuestionsCorrect', visualQuestionsCorrect);
        localStorage.setItem('visualTotalQuestions', visualTotal);
        localStorage.setItem('lastTest', 'visual');
        
        vResults.innerHTML = "You've completed all the questions. Click the button to see your report.";

        document.getElementById('vnextQuestion').style.display = 'block';
        document.getElementById('vnextQuestion').textContent = 'Open Report';
        document.getElementById('vnextQuestion').onclick = () => {
            window.location.href = 'report.html'
        };

        //document.getElementById('progressMeter').textContent = `Question ${visualTotal - visualSentences.length} of ${visualTotal}`;
        
        document.getElementById('vchecktheAnswer').disabled = true;
        document.getElementById('vchecktheAnswer').style.opacity = '0.5';
        document.getElementById("vanswerBox").disabled = true;
        document.getElementById("vanswerBox").value = ""
        return;
    }
    document.getElementById('vprogressMeter').textContent = `Question ${visualTotal - visualSentences.length + 1} of ${visualTotal}`;
    updateVisualProgressBar();
    
    currentVS = visualSentences[Math.floor(Math.random() * visualSentences.length)];
    document.getElementById("vanswerBox").value = '';
    vResults.innerHTML = '';
    document.getElementById('vnextQuestion').style.display = 'none';
    loadVisualQuestion();
}

function updateVisualProgressBar() {
    const completed = visualTotal - visualSentences.length;
    const percent  = Math.round((completed / visualTotal) * 100);
    document.getElementById('vprogressBarFill').style.width = `${percent}%`;
}