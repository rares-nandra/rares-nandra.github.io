import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, text, icon: Icon, disabled, customizations }) => {
    return (
        <button onClick = {onClick} className = {styles.button} style = {{cursor: disabled ? "default" : "pointer", backgroundColor: disabled ? customizations?.disabledBackgroundColor : customizations?.backgroundColor, color: disabled ? customizations?.disabledForegroundColor : customizations?.foregroundColor, padding: customizations?.padding}}>
            {text && <p className = {styles.text} style = {{fontSize: customizations?.fontSize}}>{text}</p>}
            {Icon && <Icon className = {styles.icon} style = {{fontSize: customizations?.fontSize}} />}
        </button>
    );
};

export default Button;