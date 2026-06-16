const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const today = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.querySelector('.greetinHelloBox p:last-child').textContent = `Today's Date is ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}. It is a ${weekdays[today.getDay()]}.`;

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const holidays = JSON.parse(localStorage.getItem(userKey('holidays')) || "[]");

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();

    const firstDayIndex = (firstDay.getDay() + 6) % 7;
    const lastDayIndex = (lastDay.getDay() + 6) % 7;

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearElement.textContent = monthYearString;
    let datesHtml = '';

    for (let i=firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHtml += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const isToday = date.toDateString() === today.toDateString();

        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        const holiday = holidays.find(h => h.date === dateString);

        datesHtml += `<div class="date ${isToday ? 'active' : ''} ${holiday ? 'holiday' : ''}" title="${holiday ? holiday.name : ''}" date-data=${dateString} onclick="showDateInfo('${dateString}')">${i}</div>`;
    }

    const remainingDays = lastDayIndex === 6 ? 0 : 6 - lastDayIndex;
    for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHtml += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHtml;
}

function showDateInfo(dateString) {
    const holidays = JSON.parse(localStorage.getItem(userKey("holidays")) || "[]");
    const reminders = JSON.parse(localStorage.getItem(userKey('reminders')) || '[]');

    const dayHolidays = holidays.filter(h => h.date === dateString);
    const dayReminders = reminders.filter(r => r.datetime.startsWith(dateString));

    let content = `<h2>${dateString}</h2>`;
    if (dayHolidays.length === 0 && dayReminders.length === 0) {
        content += "<p style='color: #aaa;'>Nothing on this day. </p>"
    }

    if (dayHolidays.length > 0) {
        content += `<h3>Holidays</h3>`;
        dayHolidays.forEach(h => {
            content += `<p>🎉${h.name}</p>`
        });
    }

    if (dayReminders.length > 0) {
        content += `<h3>Reminders</h3>`;
        dayReminders.forEach(r => {
            const time = new Date(r.datetime).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            content += `<p>⏰${r.message} at ${time}</p>`
        });
    }

    document.getElementById("dateInfoContent").innerHTML = content;
    document.getElementById("dateInfoModal").style.display = 'flex';
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

updateCalendar();