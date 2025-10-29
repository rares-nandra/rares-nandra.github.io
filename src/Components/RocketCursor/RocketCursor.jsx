import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./RocketCursor.module.css";

import { RocketCursorContext } from "../../Providers/RocketCursorProvider";

import { VscRocket } from "react-icons/vsc";

const RocketCursor = () => {
    const { setSpeed, setPosition } = useContext(RocketCursorContext);

    const [hasMouseMoved, setHasMouseMoved] = useState(false);

    const rocketPosition = useRef({ x: window.innerWidth / 2, y: window.innerHeight });
    const prevPositionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight, time: Date.now() });
    const angleRef = useRef(0);
    const mousePosition = useRef(null);
    const rocketRef = useRef(null);
    const fumes = useRef([]);
    const nextFumePosition = useRef(null);

    const handleMouseMove = (e) => {
        if(!hasMouseMoved) 
        {
            setHasMouseMoved(true);
        }

        mousePosition.current = { x: e.pageX, y: e.pageY };
    };

    const spawnFume = (x, y) => {
        const fume = document.createElement('div');
        fume.classList.add(styles.fume);
        fume.style.left = `${x}px`;
        fume.style.top = `${y}px`;
        const size = Math.floor(Math.random() * 20) + 10;
        fume.style.width = `${size}px`;
        fume.style.height = `${size}px`;
        const grayStart = Math.floor(Math.random() * 135) + 120;
        const grayEnd = Math.floor(Math.random() * 56);
        fume.style.background = `radial-gradient(circle, rgba(${grayStart},${grayStart},${grayStart},1) 0%, rgba(${grayEnd},${grayEnd},${grayEnd},1) 100%)`;

        document.body.appendChild(fume);
        fumes.current.push(fume);

        if(fumes.current.length > 10) 
        {
            fumes.current.shift().remove();
        }
    };

    const moveRocket = (dx, dy) => {
        const speedFactor = 0.01;

        rocketPosition.current.x += dx * speedFactor;
        rocketPosition.current.y += dy * speedFactor;
        setPosition(rocketPosition.current);

        const elapsedTime = (Date.now() - prevPositionRef.current.time);

        if(elapsedTime >= 300)
        {
            const deltaX = rocketPosition.current.x - prevPositionRef.current.x;
            const deltaY = rocketPosition.current.y - prevPositionRef.current.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            prevPositionRef.current = {x: rocketPosition.current.x, y: rocketPosition.current.y, time: Date.now()};
            setSpeed(Math.floor(distance / elapsedTime * 1000));
        }

        if(nextFumePosition.current) 
        {
            const distance = Math.sqrt(Math.pow(rocketPosition.current.x - nextFumePosition.current.x, 2) +Math.pow(rocketPosition.current.y - nextFumePosition.current.y, 2));

            if(distance > 30) 
            {
                spawnFume(nextFumePosition.current.x, nextFumePosition.current.y + 10);
                nextFumePosition.current = null;
            }
        }
        else if(Math.round(Math.random() * 10) === 1)
        {
            nextFumePosition.current = {...rocketPosition.current};
        }

        angleRef.current = Math.atan2(dy, dx) * (180 / Math.PI);
        rocketRef.current.style.transform = `translate(${rocketPosition.current.x}px, ${rocketPosition.current.y}px) rotate(${angleRef.current + 45}deg)`;
    };

    const animateRocket = () => {
        const rocketRect = rocketRef.current.getBoundingClientRect();
        const dx = mousePosition.current.x - rocketRect.left - rocketRect.width / 2;
        const dy = mousePosition.current.y - rocketRect.top - rocketRect.height / 2;

        if(Math.abs(1 - dx) > 2 || Math.abs(1 - dy) > 2) 
        {
            moveRocket(dx, dy);
        }
        else
        {
            setSpeed(0);
        }

        requestAnimationFrame(animateRocket);
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hasMouseMoved]);

    useEffect(() => {
        if(rocketRef.current && hasMouseMoved) 
        {
            requestAnimationFrame(animateRocket);
        }
    }, [rocketRef.current, hasMouseMoved]);

    return (
        hasMouseMoved ? (
            <div className = {styles.rocket} ref = {rocketRef}>
                <VscRocket />
            </div>
        ) : (
            <></>
        )
    );
};

export default RocketCursor;
