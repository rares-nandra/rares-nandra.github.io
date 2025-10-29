import React from "react";
import styles from "./HomeCard.module.css";

const HomeCard = ({ children, widthUnits, heightUnits, isClickable = false, padding = "0px", background = "Glass", onClick = null }) => {
    const area = widthUnits * heightUnits;
    const scaleClass = area <= 15 ? styles.scaleLarge : area <= 70 ? styles.scaleMedium : styles.scaleSmall;

    return (
        <div onClick = {onClick ? onClick : () => {}} className = {`${styles.container} ${isClickable ? styles.clickable : ""} ${scaleClass} ${background === "Glass" ? styles.glass : styles.normal}`} style = {{backgroundColor: background === "Glass" ? "var(--GLASS_background)" : background, width: `${widthUnits * 25}px`, height: `${heightUnits * 25}px`, padding: padding, cursor: onClick ? "pointer" : "default"}}>
            {children}
        </div>
    );
};

export default HomeCard;