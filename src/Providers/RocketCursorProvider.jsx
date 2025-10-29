import React, { createContext, useState } from "react";

export const RocketCursorContext = createContext();

export const RocketCursorProvider = ({ children }) => {
    const [speed, setSpeed] = useState(0);
    const [position, setPosition] = useState({x: window.innerWidth / 2, y: window.innerHeight});

    return (
        <RocketCursorContext.Provider value = {{ speed, setSpeed, position, setPosition }}>
            {children}
        </RocketCursorContext.Provider>
    );
};
