const lastTest = localStorage.getItem('lastTest');

let questionsCorrect, totalQuestions, scores, fraction;

const scoreMetric = document.getElementById("scoreMetric")
const scorePercentage = document.getElementById('scorePercentage')
const scoreAverage = document.getElementById('scoreAverage') 
const thisCouldMean = document.getElementById('thisCouldMean')

if (lastTest === 'hearing') {
    questionsCorrect = Number(localStorage.getItem('questionsCorrect'));
    totalQuestions = Number(localStorage.getItem('totalQuestions'));
    scores = JSON.parse(localStorage.getItem('quizScores'));

    if (questionsCorrect === 1 || questionsCorrect === 0) {
        thisCouldMean.innerText = 'This could suggest that your hearing levels are deficient and you may require assisstance from an external source, like a personal assistant or a family member. Special equipment, like a hearing aid, could benefit you immensely and support your hearing, allowing for increased hearing range. Consider consulting with your doctor.'
    } else if (questionsCorrect === 2 || questionsCorrect === 3) {
        thisCouldMean.innerText = "This may suggest your hearing levels are solid, but they could pose various issues towards the near future. It's best to get a jumpstart on this sooner than later because it could prevent worse medical issues from damaging you any further. To see what you can do, ask an avaiable provider near you or consult with your doctor."
    } else {
        thisCouldMean.innerText = 'This suggests that your hearing levels are great and are in good health. As of now, you are not in any dire need for special equipment that can be used to assist you. Maintaining healthy life habits and having routine checkups for your ears will help you have longer lasting ear function and better hearing quality.'
    }

} else if (lastTest === 'visual') {
    questionsCorrect = Number(localStorage.getItem('visualQuestionsCorrect'));
    totalQuestions = Number(localStorage.getItem('visualTotalQuestions'));
    scores = JSON.parse(localStorage.getItem('visualScores'));

    if (questionsCorrect === 1 || questionsCorrect === 0) {
        thisCouldMean.innerText = 'This could suggest your vision needs medical attention. Special equipment, like glasses or a cane, could benefit you immensely and support your hearing, allowing for increased hearing range. Consider consulting with your doctor.'
    } else if (questionsCorrect === 2 || questionsCorrect === 3) {
        thisCouldMean.innerText = "Your vision appears functional but could have areas of improvement. It's best to get a jumpstart on this sooner than later because it could prevent worse medical issues from damaging you any further. To see what you can do, ask an avaiable provider near you or consult with your doctor."
    } else {
        thisCouldMean.innerText = 'Your vision is in great standing! As of now, you are not in dire need for any special equipment that can be used to assist you. Maintaining healthy life habits and having routine checkups for your vision will help you sustain your vision and improve your body health.'
    }

}

fraction = questionsCorrect / totalQuestions;

console.log('lastTest:', lastTest);
console.log('questionsCorrect:', questionsCorrect);
console.log('totalQuestions:', totalQuestions);
console.log('fraction:', fraction);
console.log('scores:', scores);


let sumNum = 0;
scores.forEach(score => sumNum += score)

scoreMetric.textContent = questionsCorrect;
scoreAverage.textContent = Math.round(sumNum / scores.length) + '%'
localStorage.setItem("quizAverage", Math.round(sumNum / scores.length) + '%')
scorePercentage.textContent = Math.round(fraction * 100)

function drawCircle(fraction) {
    const canvas = document.getElementById('scoreCircle')
    const ctx = canvas.getContext('2d')
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = 180;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * fraction);
    let current = 0;
    const speed = 0.005;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e0e0e0'
        ctx.lineWidth = 15;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, radius, startAngle, startAngle + (2 * Math.PI * current));
        ctx.strokeStyle = '#45a6f6';
        ctx.lineWidth = 15;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.fillStyle = '#e0e0e0';
        ctx.font = 'bold 48px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${questionsCorrect}/${totalQuestions}`, cx, cy);

        if (current < fraction) {
            current = Math.min(current + speed, fraction);
            requestAnimationFrame(animate)
        }
    }

    animate();
}

drawCircle(fraction);

function createPDF() {
    const { jsPDF } = window.jspdf;
    const reportBox = document.querySelector('.boxmaker');

    html2canvas(reportBox, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('TestingReport.pdf');
    });
}

emailjs.init('pp86DMYq_5Sz0RKOV')

function emailReport() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const templateParams = {
        name: currentUser.fName,
        email: currentUser.email,
        questions_correct: questionsCorrect,
        total_questions: totalQuestions,
        average: localStorage.getItem('quizAverage')
    };

    emailjs.send('service_n7onsmh', 'template_ctrwchm', templateParams)
        .then(() => {
            alert('Report sent to ' + currentUser.email + '!');
        })
        .catch((error) => {
            alert('Something went wrong: ' + error);
        });
}