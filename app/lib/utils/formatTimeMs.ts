/**
 * Formats a time duration given in milliseconds to a string in the format "MM:SS".
 *
 * @param {number} ms - The time duration in milliseconds.
 * @returns {string} - The formatted time string in the format "MM:SS".
 */
export function formatTimeMs(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
