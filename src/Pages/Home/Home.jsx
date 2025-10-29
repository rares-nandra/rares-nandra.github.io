import React, {useState, useEffect} from "react";
import styles from "./Home.module.css";

import Masonry from "./Masonry/Masonry";

const Home = ({isInView}) => {
    return (
        <div className = {styles.page}>
            <Masonry />
        </div>
    );
};

export default Home;