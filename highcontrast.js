if (localStorage.getItem('highContrast') === 'true') {
    document.documentElement.classList.add('high-contrast');
}

const toggle = document.getElementById('highContrastToggle');
if (toggle) {
    toggle.checked = localStorage.getItem('highContrast') === 'true';
    toggle.addEventListener('change', () => {
        document.documentElement.classList.toggle('high-contrast', toggle.checked);
        localStorage.setItem('highContrast', toggle.checked);
    });
}