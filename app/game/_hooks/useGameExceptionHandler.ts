import { useState, useEffect, useCallback } from "react";

// TODO: revisar el uso del any
// (por ahora donde se usa el hook, es un objeto con propiedad message: string
// sin embargo usar genericos o unknown podria ser mejor)

interface useExceptionHandlerReturnType {
  exception: any;
  handleException: (data: any) => void;
}

const TIME_TO_DISAPPEAR = 10000; // 10 seconds

/**
 * Custom hook to handle exceptions in the game.
 *
 * @returns {useExceptionHandlerReturnType} - An object containing the exception and a function to handle exceptions.
 */
export function useExceptionHandler(): useExceptionHandlerReturnType {
  const [exception, setException] = useState<any>(null);

  const handleException = useCallback((data: any) => {
    setException(data);
  }, []);

  useEffect(() => {
    if (!exception) return;

    const timer = setTimeout(() => {
      setException(null);
    }, TIME_TO_DISAPPEAR);

    // Clears the timer if the component unmounts or the state changes
    return () => clearTimeout(timer);
  }, [exception]);

  return { exception, handleException };
}
