document.getElementById("createHolidayBtn").addEventListener('click', () => {
    document.getElementById("holidayModal").style.display = 'flex';
});

document.getElementById("closeHolidayModal").addEventListener('click', () => {
    document.getElementById("holidayModal").style.display = 'none';
});


document.getElementById("saveHoliday").addEventListener('click', () => {
    const name = document.getElementById("holidayName").value;
    const date = document.getElementById("holidayDate").value;

    if (!name || !date) return alert ("Please fill in both fields");

    const holidays = JSON.parse(localStorage.getItem(userKey("holidays")) || "[]");
    holidays.push({name, date});
    localStorage.setItem(userKey("holidays"), JSON.stringify(holidays));

    document.getElementById("holidayModal").style.display = 'none';
    updateCalendar();
    alert("Holiday added!");
});