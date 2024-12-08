/** Gen random Id for guest players */
export function generatePlayerIdForGuest() {
  return `guest_${Date.now() + Math.floor(Math.random() * 1000)}`;
}
