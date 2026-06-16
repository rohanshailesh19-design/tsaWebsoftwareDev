const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const fileNameDisplay = document.getElementById('fileName');

uploadBtn.addEventListener('click', function(){
    fileInput.click();
});

fileInput.addEventListener('change', function(){
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
    }else {
        fileNameDisplay.textContent = "No File Chosen"
    }
})
