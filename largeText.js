const largeTextToggle = document.getElementById("largeTextToggle");

if (localStorage.getItem('largeText') === 'true') {
    document.body.classList.add('large-text');
    largeTextToggle.checked = true;
}

largeTextToggle.addEventListener('change', () => {
    if (largeTextToggle.checked) {
        document.body.classList.add('large-text');
        localStorage.setItem('largeText', 'true');
    } else {
        document.body.classList.remove('large-text');
        localStorage.setItem('largeText', 'false');
    }
})