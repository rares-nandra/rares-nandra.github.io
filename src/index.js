import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import "./Assets/Fonts/Fonts.css";
import "./Assets/Themes/DarkMode.css";

import "./index.css";

import { WindowSizeProvider } from "./Providers/WindowSizeProvider";
import { RocketCursorProvider } from "./Providers/RocketCursorProvider";

import RocketCursor from "./Components/RocketCursor/RocketCursor";
import Dock from "./Components/Dock/Dock";

import Home from "./Pages/Home/Home";
import Projects from "./Pages/Projects/Projects";
import Game from "./Pages/Game/Game";

import { IoHomeSharp, IoGameController } from "react-icons/io5";
import { FaLaptopCode } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const pages = [
    { id: "Home", icon: IoHomeSharp, content: Home },
    { id: "Projects", icon: FaLaptopCode, content: Projects },
    { id: "Game", icon: IoGameController, content: Game }
];

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activePageID, setActivePageID] = useState(location.pathname.substring(1) || "Home");

    const swiperRef = useRef(null);

    const handlePageChange = (id, index) => {
        setActivePageID(id);
        swiperRef.current?.swiper.slideTo(index);
        navigate(`/${id}`);
    };

    const handleKeyDown = (event) => {
        const currentIndex = pages.findIndex((page) => page.id === activePageID);

        if(event.key === "ArrowRight" && currentIndex < pages.length - 1) 
        {
            if(currentIndex === pages.length - 1)
            {
                return;
            }

            handlePageChange(pages[currentIndex + 1].id, currentIndex + 1);
        } 
        else if(event.key === "ArrowLeft" && currentIndex > 0) 
        {
            if(currentIndex === 0)
            {
                return;
            }

            handlePageChange(pages[currentIndex - 1].id, currentIndex - 1);
        }
    };

    useEffect(() => {
        const path = location.pathname.substring(1) || "Home";
        const index = pages.findIndex((page) => page.id === path);
        
        if(index !== -1) 
        {
            swiperRef.current?.swiper.slideTo(index);
        }
    }, [location]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activePageID]);

    return (
        <>
            <RocketCursor />
            
            <Swiper ref = {swiperRef} onSlideChange = {(swiper) => {handlePageChange(pages[swiper.activeIndex].id, swiper.activeIndex)}} className = "swiper" slidesPerView = {1} allowTouchMove = {false}>    
                {pages.map((page, index) => (
                    <SwiperSlide key = {index}>
                        <page.content isInView = {activePageID === page.id} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Dock onSelected = {handlePageChange} activeID = {activePageID} selections = {pages} iconSizes = {[21, 24, 28, 30]} />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <WindowSizeProvider>
        <RocketCursorProvider>
            <App />
        </RocketCursorProvider>
        </WindowSizeProvider>
    </Router>
);