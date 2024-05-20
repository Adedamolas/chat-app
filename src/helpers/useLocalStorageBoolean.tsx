import { useState, useEffect } from "react";

// Custom hook for using state with localStorage
function useLocalStorageBoolean(
  key: string,
  initialValue: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  // Retrieve from localStorage or use initial value
  const storedValue = localStorage.getItem(key);
  const initial = storedValue !== null ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<boolean>(initial);

  useEffect(() => {
    // Update localStorage whenever the state changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorageBoolean;
