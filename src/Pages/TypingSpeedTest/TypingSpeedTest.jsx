import React, { useState, useEffect, useRef } from "react";
import "./TypingSpeedTest.css";

const TypingSpeedTest = () => {
    const [paragraph, setParagraph] = useState("");
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [hasFinished, setHasFinished] = useState(false);
    const inputRef = useRef(null);
    const [timerStarted, setTimerStarted] = useState(false);

    useEffect(() => {
        fetchRandomParagraph();
    }, []);

    useEffect(() => {
        let interval = null;
        if (timerStarted && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            calculateWpm();
            setIsActive(false);
            setHasFinished(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerStarted, timeLeft]);

    const fetchRandomParagraph = async () => {
        const response = await fetch(
            "https://baconipsum.com/api/?type=all-meat&paras=1&format=text"
        );
        const text = await response.text();
        setParagraph(text);
    };

    const handleChange = (e) => {
        if (!isActive) {
            setIsActive(true);
        }
        if (!timerStarted) {
            setTimerStarted(true);
        }
        setUserInput(e.target.value);
    };

    const startTest = () => {
        setTimeLeft(60);
        setUserInput("");
        setWpm(0);
        setHasFinished(false);
        setIsActive(false);
        setTimerStarted(false);
        inputRef.current.focus();
    };

    const calculateWpm = () => {
        const wordsTyped = userInput.trim().split(/\s+/).length;
        const timeTaken = (60 - timeLeft) / 60; // Time taken in minutes
        const calculatedWpm = Math.round(wordsTyped / timeTaken);
        setWpm(calculatedWpm);
    };

    const restartTest = () => {
        fetchRandomParagraph();
        startTest();
    };

    return (
        <div className="typing-speed-test">
            <h1>
                <span>T</span>yping <span>Turbo</span>
            </h1>
            <div className="test-area">
                <div className="paragraph">
                    {paragraph.split("").map((char, index) => (
                        <span
                            key={index}
                            className={
                                userInput[index] === char
                                    ? "correct"
                                    : userInput[index]
                                    ? "incorrect"
                                    : ""
                            }
                        >
                            {char}
                        </span>
                    ))}
                </div>
                <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleChange}
                    disabled={hasFinished}
                    placeholder="Start typing here..."
                    className="type-input-area"
                />
            </div>
            <div className="info">
                <div className="timer">Time Left: {timeLeft}s</div>
                {hasFinished && <div className="wpm">Your WPM: {wpm}</div>}
                <button
                    onClick={restartTest}
                    className="start-button"
                >
                    {hasFinished ? "Restart" : "Start Over"}
                </button>
            </div>
        </div>
    );
};

export default TypingSpeedTest;
