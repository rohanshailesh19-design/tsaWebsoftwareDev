emailjs.init('pp86DMYq_5Sz0RKOV')

let selectedRating = 0;

const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = star.getAttribute('data-value');
        stars.forEach(s => {
            s.classList.toggle('selected', s.getAttribute('data-value') <= selectedRating);
        });
    });
});

document.getElementById('sendFeedback').addEventListener('click', () => {
    const feedback = document.getElementById('feedbackInput').value.trim();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!feedback) return showToast('Please write some feedback!');
    if (!selectedRating) return showToast('Please select a star rating!');

    const templateParams = {
        name: currentUser.fName + ' - ' + selectedRating + '/5 stars',
        feedback: feedback
    };

    emailjs.send('service_n7onsmh', 'template_r1jp724', templateParams)
        .then(() => {
            showToast('Feedback sent, thank you!');
            document.getElementById('feedbackInput').value = '';
            selectedRating = 0;
            stars.forEach(s => s.classList.remove('selected'));  
        })
        .catch(() => {
            showToast('Something went wrong, try again!');
        });
});