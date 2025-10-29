import React, { createContext, useContext, useState, useEffect } from "react";

const WindowSizeContext = createContext(null);

export const WindowSizeProvider = ({ children }) => {
    const [windowSize, setWindowSize] = useState({windowWidth: window.innerWidth, windowHeight: window.innerHeight});

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <WindowSizeContext.Provider value = {windowSize}>
            {children}
        </WindowSizeContext.Provider>
    );
};

export const useWindowSize = () => {
    const context = useContext(WindowSizeContext);
    
    if(context === null) 
    {
        throw new Error("useWindowSize must be used within a WindowSizeProvider");
    }
    return context;
};