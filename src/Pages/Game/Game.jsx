import React, {useState, useEffect, useContext, useRef} from "react";
import styles from "./Game.module.css";

import { RocketCursorContext } from "../../Providers/RocketCursorProvider";

import { GiAsteroid } from "react-icons/gi";

const Game = ({isInView}) => {
    const { speed, position } = useContext(RocketCursorContext);
    const [ lightYears, setLightYears ] = useState(0);
    const [ totalAsteroidsSpawned, setTotalAsteroidsSpawned ] = useState(0);
    const [ highscore, setHighscore ] = useState(0);
    const [ asteroids, setAsteroids ] = useState([]);
    const [ gameOver, setGameOver ] = useState(false);

    const isPaused = useRef(true);
    const elapsedTimeInterval = useRef(null);
    const spawnInterval = useRef(null);
    const animationFrameId = useRef(null);
    const asteroidsRef = useRef([]);
    const positionRef = useRef(position);
    const lightYearsRef = useRef(0);
    const totalAsteroidsSpawnedRef = useRef(0);

    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        asteroidsRef.current = asteroids;
    }, [asteroids]);

    useEffect(() => {
        positionRef.current = position;
    }, [position]);

    useEffect(() => {
        lightYearsRef.current = lightYears;
    }, [lightYears]);

    useEffect(() => {
        totalAsteroidsSpawnedRef.current = totalAsteroidsSpawned;
    }, [totalAsteroidsSpawned]);

    useEffect(() => {
        const savedRaw = localStorage.getItem("gameHighscore");
        const savedHigh = savedRaw == null ? 0 : parseFloat(savedRaw);
        if(!Number.isNaN(savedHigh)) {
            setHighscore(savedHigh);
        }
    }, []);

    useEffect(() => {    
        isPaused.current = !isInView;

        let countdownInterval;

        const startCountdown = () => {
            setCountdown(3);
            countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if(prev > 1) {return prev - 1}
                    clearInterval(countdownInterval);
                    setCountdown(null);
                    runGame();
                    return null;
                });
            }, 1000);
        };

        if(isInView === false)
        {
            clearInterval(elapsedTimeInterval.current);
            clearInterval(spawnInterval.current);
            if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            return () => {
                clearInterval(countdownInterval);
                clearInterval(elapsedTimeInterval.current);
                clearInterval(spawnInterval.current);
                if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            };
        }

        startCountdown();
      
        return () => {
            clearInterval(countdownInterval)
            clearInterval(elapsedTimeInterval.current);
            clearInterval(spawnInterval.current);
            if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [isInView]);

    const runGame = () => {
        isPaused.current = false;

        elapsedTimeInterval.current = setInterval(() => {
            if(!isPaused.current) 
            {
                setLightYears((prev) => +(prev + 0.1).toFixed(1));
            }
        }, 500);

        spawnInterval.current = setInterval(() => {
            if(isPaused.current) return;
            const batch = 3; // spawn more asteroids per tick
            const newAsteroids = [];
            for(let i = 0; i < batch; i++) {
                const size = Math.floor(24 + Math.random() * 24);
                const x = Math.max(0, Math.min(window.innerWidth - size, Math.random() * window.innerWidth));
                const speedY = 2 + Math.random() * 3;
                const angle = Math.random() * 360;
                let rotSpeed = (Math.random() * 4) + 0.5;
                if(Math.random() < 0.5) rotSpeed = -rotSpeed;
                newAsteroids.push({ id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`), x, y: -size, size, speedY, angle, rotSpeed });
            }
            setAsteroids((prev) => [...prev, ...newAsteroids]);
            setTotalAsteroidsSpawned((prev) => prev + newAsteroids.length);
        }, 600);

        animationFrameId.current = requestAnimationFrame(gameLogic);
    };

    const gameLogic = () => {
        let hit = false;
        const rocketWidth = 30;
        const rocketHeight = 30;
        const rocketX = positionRef.current.x + rocketWidth / 2;
        const rocketY = positionRef.current.y + rocketHeight / 2;
        const rocketRadius = 16;

        const prev = asteroidsRef.current;
        const next = [];
        for(const a of prev)
        {
            const ny = a.y + a.speedY;
            const na = (a.angle + a.rotSpeed) % 360;
            if(ny <= window.innerHeight + a.size)
            {
                const updated = { ...a, y: ny, angle: na };
                next.push(updated);

                const ax = updated.x + updated.size / 2;
                const ay = updated.y + updated.size / 2;
                const dx = ax - rocketX;
                const dy = ay - rocketY;
                const rr = rocketRadius + updated.size / 2;
                if(dx*dx + dy*dy <= rr*rr) { hit = true; }
            }
        }

        setAsteroids(next);
        asteroidsRef.current = next;

        if(hit && !isPaused.current)
        {
            handleGameOver();
            return;
        }

        if(isPaused.current === false)
        {
            animationFrameId.current = requestAnimationFrame(gameLogic);
        }
    };

    const handleGameOver = () => {
        const finalScore = Number((totalAsteroidsSpawnedRef.current + lightYearsRef.current * 10).toFixed(1));

        const storedRaw = localStorage.getItem("gameHighscore");
        const storedHigh = storedRaw == null ? 0 : parseFloat(storedRaw);
        const currentHigh = Number.isNaN(storedHigh) ? 0 : Math.max(storedHigh, highscore);
        const nextHigh = Math.max(currentHigh, finalScore);
        try { localStorage.setItem("gameHighscore", String(nextHigh)); } catch {}
        setHighscore(nextHigh);

        isPaused.current = true;
        setGameOver(true);
        clearInterval(elapsedTimeInterval.current);
        clearInterval(spawnInterval.current);
        if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);

        setTimeout(() => {
            setGameOver(false);
            setLightYears(0);
            setAsteroids([]);
            setTotalAsteroidsSpawned(0);

            setCountdown(3);
            const ci = setInterval(() => {
                setCountdown((prev) => {
                    if(prev > 1) {return prev - 1}
                    clearInterval(ci);
                    setCountdown(null);
                    runGame();
                    return null;
                });
            }, 1000);
        }, 1200);
    };

    return (
        <div className = {styles.page}>
            <div className={`${styles.stars} ${styles.smallStars}`}></div>
            <div className={`${styles.stars} ${styles.mediumStars}`}></div>
            <div className={`${styles.stars} ${styles.largeStars}`}></div>

            {asteroids.map((a) => (
                <div
                    key={a.id}
                    style={{
                        position: "absolute",
                        left: a.x,
                        top: a.y,
                        width: a.size,
                        height: a.size,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "var(--COLOR_textPrimary)",
                        pointerEvents: "none",
                        transform: `rotate(${a.angle}deg)`
                    }}
                >
                    <GiAsteroid size={a.size} />
                </div>
            ))}


            {countdown && (
                <div className = {styles.countdownContainer}>
                    <h1 className = {styles.countdown}>{countdown}</h1>
                </div>
            )}

            {gameOver && (
                <div className = {styles.countdownContainer}>
                    <h1 className = {styles.countdown}>Game Over</h1>
                </div>
            )}

            <div className = {styles.statsContainer}>
                <h1 className = {styles.score}>Highscore: {highscore.toFixed(1)}</h1>
                <h1 className = {styles.score}>Score: {(totalAsteroidsSpawned + lightYears * 10).toFixed(1)}</h1>
                <h3 className = {styles.stat}>{lightYears} light years</h3>
                <h3 className = {styles.stat}>{speed} px/ms</h3>
            </div>
        </div>
    );
};

export default Game;