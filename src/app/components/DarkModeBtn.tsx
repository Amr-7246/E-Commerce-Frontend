'use client';

import { useEffect, useState } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs'; 

export const ThemeToggle = () => {
const [isDark, setIsDark] = useState(false);

useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
    }
}, []);

const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);
};

return (
    <button
        onClick={toggleTheme}
        style={{color: 'text'}}
        className=" p-2 cursor-pointer rounded-full z-50 transition-all hover:scale-110 duration-200"
        aria-label="Toggle Dark Mode"
    >
        {isDark ? <BsSun size={20} /> : <BsMoon size={20} />}
    </button>
);
};
