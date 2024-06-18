import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const DarkModeContext = createContext<any>([]);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("darkMode") || "false");
    if (storedData) {
      setDarkMode(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (typeof context === undefined) {
    throw Error("Context must be used within Provider");
  } else {
    return context;
  }
};
