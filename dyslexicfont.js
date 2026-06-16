const dyslexicToggle = document.getElementById('dyslexicFontToggle');

if (localStorage.getItem('dyslexicFont') === 'true') {
    document.body.classList.add('dyslexic-font');
    if (dyslexicToggle) dyslexicToggle.checked = true;
}

if (dyslexicToggle) {
    dyslexicToggle.addEventListener('change', () => {
        if (dyslexicToggle.checked) {
            document.body.classList.add('dyslexic-font');
            localStorage.setItem('dyslexicFont', 'true');
        } else {
            document.body.classList.remove('dyslexic-font');
            localStorage.setItem('dyslexicFont', 'false');
        }
    })
}