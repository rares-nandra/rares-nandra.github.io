import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./SegmentedControl.module.css";

const SegmentedControl = ({ onChange, selections, customizations }) => {
    const [selectedSelection, setSelectedSelection] = useState(0);
    const [activeStyle, setActiveStyle] = useState({});
    const selectionRefs = useRef([]);

    const handleSelectionSelected = (index, id) => {
        setSelectedSelection(index);
        onChange(id);
    };

    const updateActiveStyle = () => {
        const selectedElement = selectionRefs.current[selectedSelection];
        
        if(selectedElement) 
        {
            const { offsetLeft, offsetWidth, offsetHeight } = selectedElement;
            const borderRadiusTop = customizations?.borderRadiusTop || "8px";
            const borderRadiusBottom = customizations?.borderRadiusBottom || "8px";
            let borderRadius = "0px";

            if(selections.length === 1) 
            {
                borderRadius = `${borderRadiusTop} ${borderRadiusTop}${borderRadiusBottom} ${borderRadiusBottom}`;
            } 
            else if(selectedSelection === 0) 
            {
                borderRadius = `${borderRadiusTop} 0px 0px ${borderRadiusBottom}`;
            }
            else if(selectedSelection === selections.length - 1) 
            {
                borderRadius = `0px ${borderRadiusTop} ${borderRadiusBottom} 0px`;
            }

            setActiveStyle({
                left: offsetLeft,
                width: offsetWidth,
                height: offsetHeight,
                borderRadius,
            });
        }
    };

    useLayoutEffect(() => {
        updateActiveStyle();
        window.addEventListener("resize", updateActiveStyle);
        return () => window.removeEventListener("resize", updateActiveStyle);
    }, [selectedSelection, selections]);

    return (
        <div className = {`${styles.container} ${customizations?.heigthBehaviour === "fillParent" ? styles.containerFillHeigth : ""} ${customizations?.widthBehaviour === "scrollAll" ? styles.containerScrollAll : customizations?.widthBehaviour === "scrollIndividual" ? styles.containerScrollIndividual : customizations?.widthBehaviour === "scrollIndividualFillParent" ? styles.containerScrollIndividualFillParent : customizations?.widthBehaviour === "overflow" ? styles.containerOverflow : ""}`}>
            <div className = {styles.activeIndicator} style = {{...activeStyle, backgroundColor: customizations?.backgroundColorActive}}></div>

            {selections.map((selection, index) => (
                <div key = {index} ref = {(el) => (selectionRefs.current[index] = el)} className = {`${styles.containerSelection} ${index === selectedSelection ? styles.containerSelectionActive : ""}`} style = {{backgroundColor: customizations?.backgroundColor, padding: customizations?.padding, borderRadius: selections.length === 1 ? `${customizations.borderRadiusTop || "8px"} ${customizations.borderRadiusTop || "8px"} ${customizations.borderRadiusBottom || "8px"} ${customizations.borderRadiusBottom || "8px"}` : index === 0 ? `${customizations.borderRadiusTop || "8px"} 0px 0px ${customizations.borderRadiusBottom || "8px"}` : index === selections.length - 1 ? `0px ${customizations.borderRadiusTop || "8px"} ${customizations.borderRadiusBottom || "8px"} 0px` : "0px"}} title = {selection.description || undefined} onClick = {() => handleSelectionSelected(index, selection.id)}>
                    <p className = {styles.selectionText} style = {{color: index === selectedSelection ? customizations?.foregroundColorActive : customizations?.foregroundColor, fontSize: customizations?.fontSize}}>
                        {selection.name}
                        {selection.highlightText && (
                            <span style = {{color: customizations?.highlightColor, fontSize: customizations?.fontSize}}>
                                {selection.highlightText}
                            </span>
                        )}
                    </p>
                    {selection.icon && (
                        typeof selection.icon === "function" ? (
                            <selection.icon className = {styles.selectionIcon} style = {{color: index === selectedSelection ? customizations?.foregroundColorActive : customizations?.foregroundColor, fontSize: customizations?.fontSize}}/>
                        ) : (
                            <div className = {styles.selectionIcon} style = {{color: index === selectedSelection ? customizations?.foregroundColorActive : customizations?.foregroundColor, fontSize: customizations?.fontSize}}>
                                {selection.icon}
                            </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default SegmentedControl;