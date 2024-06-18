import { ReactNode } from "react";
import { useDarkMode } from "@/utils/DarkModeContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col gap-5">
      <nav className="flex justify-between items-center text-xl">
        <h1 className="font-mono">Task Tracker</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bi bi-moon"
        ></button>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
