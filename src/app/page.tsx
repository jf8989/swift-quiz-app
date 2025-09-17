"use client";

import { useState } from "react";
import SwiftQuiz from "../Components/SwiftQuiz";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`min-h-screen py-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <SwiftQuiz darkMode={darkMode} setDarkMode={setDarkMode} />
    </main>
  );
}
