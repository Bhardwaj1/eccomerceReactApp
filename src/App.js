import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-4 border rounded-md bg-black text-white dark:bg-white dark:text-black"
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
}

export default App;
