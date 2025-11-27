import {createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext();
export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") || "light"
    );

    const toggleDarkMode = () => {
        setIsDarkMode(prev => prev === "dark" ? "light" : "dark");
    };

    useEffect(()=>{
        const root = window.document.documentElement;

        if(isDarkMode === "dark"){
            root.classList.add("dark");
        }else{
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
        value={{isDarkMode: isDarkMode==="dark", toggleDarkMode}}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);
