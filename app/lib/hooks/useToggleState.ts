import { useCallback, useState } from "react";

/**
 * Custom hook to manage a boolean toggle state.
 *
 * @param {boolean} [initialState=false] - The initial state of the toggle.
 * @returns {[boolean, () => void]} - An array containing the current state and a function to toggle the state.
 */
export default function useToggleState(initialState: boolean = false) {
  const [state, setState] = useState(initialState);

  const toggleState = useCallback(() => {
    setState(!state);
  }, [state]);

  return [state, toggleState] as const;
}
