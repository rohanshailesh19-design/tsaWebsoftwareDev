const quickNoteModal = document.getElementById("quickNoteModal");
const quickNoteInput = document.getElementById("quickNoteInput");
const saveQuickNote = document.getElementById("saveQuickNote");
const closeQuickNote = document.getElementById("closeQuickNoteModal");
const quickNoteBtn = document.getElementById("quickNoteBtn");
const sideBarNoteContent = document.getElementById("sidebarNoteContent");

function loadNoteToSidebar() {
    const notes = JSON.parse(localStorage.getItem(userKey('quickNotes'))) || [];
    if (notes.length === 0) {
        sideBarNoteContent.innerHTML = '<p>No notes yet...</p>'
        return;
    }
    sideBarNoteContent.innerHTML = notes.slice().reverse().map((note, index) => `
        <div class="noteItem">
            <p>${note.text}</p>
            <small>${note.date}</small>
            <button class="deleteNote" data-index="${index}">Delete</button>
        </div>
    `).join('');

    document.querySelectorAll('.deleteNote').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const i = e.target.getAttribute('data-index');
            const notes = JSON.parse(localStorage.getItem(userKey('quickNotes'))) || [];
            notes.splice(i, 1);
            localStorage.setItem(userKey('quickNotes'), JSON.stringify(notes));
            loadNoteToSidebar();
        });
    });
}

loadNoteToSidebar();

closeQuickNote.addEventListener('click', () => {
    quickNoteModal.style.display = 'none';
})

quickNoteBtn.addEventListener('click', () => {
    quickNoteInput.value =  '';
    quickNoteModal.style.display = "flex";
});

saveQuickNote.addEventListener('click', () => {
    const text = quickNoteInput.value.trim();
    if (!text) return;
    const notes = JSON.parse(localStorage.getItem(userKey('quickNotes'))) || [];
    notes.push({
        text: text,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem(userKey('quickNotes'), JSON.stringify(notes));
    loadNoteToSidebar();
    quickNoteModal.style.display = 'none';
    showToast('Note has been saved!')
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.add('hide');
        toast.classList.remove('show');
    }, 3000)
}

function matchAsideheight() {
    const section = document.querySelector('section');
    const aside = document.querySelector('aside');
    aside.style.maxHeight = section.scrollHeight + 'px';
}

window.addEventListener('load', matchAsideheight);
window.addEventListener('resize', matchAsideheight);

matchAsideheight();