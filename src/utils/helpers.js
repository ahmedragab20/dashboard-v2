export function startCountdown(targetDate, onTick) {
  return new Promise((resolve, reject) => {
    // Update the timer every second
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate.getTime() - now;

      // If the timer has run out, stop updating and resolve with "Time's up!"
      if (timeLeft < 0) {
        clearInterval(intervalId);
        resolve({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate the remaining time in days, hours, minutes, and seconds
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Return the remaining time data as an object
      const remainingTime = {
        days: daysLeft,
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      };
      onTick(remainingTime);
    }, 1000);
  });
}
export function makeItLikeVRow(el) {
  console.log({ el });
  el?.classList?.add('row');
}
