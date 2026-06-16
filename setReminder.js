document.addEventListener("DOMContentLoaded", () => {
    Notification.requestPermission();
    loadReminders();
    startReminderChecker();

    document.getElementById("setReminderBtn").addEventListener("click", () => {
        document.getElementById("reminderModal").style.display = "flex";
    });

    document.getElementById("closeModal").addEventListener('click', () => {
        document.getElementById("reminderModal").style.display = "none";
    });

    document.getElementById("saveReminder").addEventListener('click', () => {
        const message = document.getElementById("reminderMessage").value;
        const datetime = document.getElementById("reminderTime").value;

        if (!message || !datetime) return alert("Please fill in both fields");

        const reminders = JSON.parse(localStorage.getItem(userKey('reminders')) || '[]');
        reminders.push({message, datetime, fired: false});
        localStorage.setItem(userKey("reminders"), JSON.stringify(reminders));

        document.getElementById('reminderModal').style.display = 'none';
        alert("Reminder saved!");
    });
});

console.log(Notification.permission)

function startReminderChecker() {
    setInterval(() => {
        const now = new Date();
        const reminders = JSON.parse(localStorage.getItem(userKey('reminders')) || '[]');

        reminders.forEach((r, i) => {
            if (!r.fired && new Date(r.datetime) <= now) {
                new Notification("OneWorld Reminder", {body: r.message});
                reminders[i].fired = true;
                console.log("Reminder fired: ", r.message, r.datetime);
            }
        });
        localStorage.setItem(userKey('reminders'), JSON.stringify(reminders));
    }, 10000);
}

function loadReminders() {
    return JSON.parse(localStorage.getItem(userKey("reminders")) || "[]")
};