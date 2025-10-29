import React from "react";
import styles from "./Projects.module.css";

const Projects = ({isInView}) => {
    return (
        <div className = {styles.page}>
            <h1 style = {{fontSize: "30px", marginLeft: "45vw", marginTop: "40vh", color: "white"}}>Projects</h1>
        </div>
    );
};

export default Projects;