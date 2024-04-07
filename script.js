// Your script here.
document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const countDown = document.getElementById("countDown");
    const endTime = document.getElementById("endTime");
    const startButton = document.querySelector("button");

    // Function to start the countdown timer
    function startTimer(duration) {
        const startTime = new Date().getTime();
        const endTimeValue = new Date(startTime + duration * 60000); // Convert minutes to milliseconds
        updateTime();

        const timerInterval = setInterval(updateTime, 1000);

        function updateTime() {
            const currentTime = new Date().getTime();
            const remainingTime = endTimeValue - currentTime;

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                countDown.textContent = "Countdown Ended";
            } else {
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                countDown.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                endTime.textContent = endTimeValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        }
    }

    // Event listener to start timer when Enter is pressed
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const duration = parseInt(userInput.value);
            if (!isNaN(duration) && duration > 0) {
                startTimer(duration);
            }
        }
    });

    // Default timer options
    const defaultTimers = [5, 10, 15];

    // Create buttons for default timers
    defaultTimers.forEach(timer => {
        const button = document.createElement("button");
        button.textContent = `${timer} minutes`;
        button.addEventListener("click", function () {
            startTimer(timer);
        });
        document.body.appendChild(button);
    });
});

