let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll(`[data-time]`);

function timer(seconds) {
    // Clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // Display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const hours = ('0' + Math.floor(seconds / 3600 % 24)).slice(-2);
    const remainderMinutes = ('0' + Math.floor(seconds / 60 % 60)).slice(-2);
    const remainderSeconds = ('0' + Math.floor(seconds % 60)).slice(-2);
    const display = `${hours}:${remainderMinutes}:${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    if (display === "00:00:00") {
        timerDisplay.style.color = 'crimson';
        // An alarm sound here should be nice too
    } else {
        timerDisplay.style.color = 'white';
    }
    console.log({hours, remainderMinutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});
