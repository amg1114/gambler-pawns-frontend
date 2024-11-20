export const readFromSessionStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;
  const storedData = sessionStorage.getItem(key);
  if (!storedData) return null;
  return JSON.parse(storedData);
};

export const writeToSessionStorage = <T>(key: string, data: T): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const removeFromSessionStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
