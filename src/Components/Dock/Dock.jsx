import React, { useEffect, useState } from "react";
import styles from "./Dock.module.css";

import { useWindowSize } from "../../Providers/WindowSizeProvider";

const Dock = ({ onSelected, activeID, selections, iconSizes }) => {
    const { windowWidth, windowHeight } = useWindowSize();

    const [indicatorPosition, setIndicatorPosition] = useState(0);
    const [transitionDuration, setTransitionDuration] = useState("0ms");
    const [currentIconSize, setCurrentIconSize] = useState(iconSizes[Math.floor(windowWidth / (1980 / iconSizes.length))]);

    useEffect(() => {
        setCurrentIconSize(iconSizes[Math.floor(windowWidth / (1980 / iconSizes.length))]);
    }, [windowWidth, iconSizes]);

    useEffect(() => {
        const newPosition = 15 + (currentIconSize + 50) * selections.findIndex((selection) => selection.id === activeID);
        const duration = Math.abs(indicatorPosition - newPosition);
        setTransitionDuration(`${duration}ms`);
        setIndicatorPosition(newPosition);
    }, [activeID]);

    return (
        <div className = {styles.overlay}>
        <div className = {styles.container}>
            <div className = {styles.selections}>
                {selections.map((selection, index) => (
                    <div key = {index} onClick = {() => {onSelected(selection.id, index)}} className = {styles.selection}>
                        <selection.icon className = {styles.icon} style = {{fontSize: `${currentIconSize}px`}} />
                    </div>
                ))}
            </div>
            
            <div className = {styles.indicatorContainer}>
                <div className = {styles.indicator} style = {{left: `${indicatorPosition}px`, width: `${currentIconSize + 10}px`, transition: `left ${transitionDuration} ease-in-out`}}></div>
            </div>
        </div>
        </div>
    );
};

export default Dock;
