const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('aside');
const section = document.querySelector('section');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    section.classList.toggle('expanded');

    if (sidebar.classList.contains('hidden')) {
        toggleBtn.innerText = '>';
        toggleBtn.style.left = '0';
    } else {
        toggleBtn.innerText = '<';
        toggleBtn.style.left = '15%';
    }
});