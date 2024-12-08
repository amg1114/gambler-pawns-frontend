/**
 * Formats a timer value to "MM:SS" if it is a two-digit number.
 *
 * @param {string} timer - The timer value to format.
 * @returns {string} - The formatted timer value.
 */
export function formatTimer(timer: string): string {
  // Check if the timer is a two-digit number
  if (/^\d{1,2}$/.test(timer)) {
    return `${timer}:00`;
  }
  return timer;
}
