const reduceMotionToggle = document.getElementById('reduceMotionToggle');

if (localStorage.getItem('reduceMotion') === 'true') {
    document.body.classList.add('reduce-motion');
    if (reduceMotionToggle) reduceMotionToggle.checked = true;
}

if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', () => {
        if (reduceMotionToggle.checked) {
            document.body.classList.add('reduce-motion');
            localStorage.setItem('reduceMotion', 'true');
        } else {
            document.body.classList.remove('reduce-motion');
            localStorage.setItem('reduceMotion', 'false');
        }
    })
}