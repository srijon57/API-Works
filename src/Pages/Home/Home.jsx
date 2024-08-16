import React from "react";
import TypingEffect from "react-typing-effect";
import "./Home.css"; 

export const Home = () => {
    return (
        <div className="home-container">
            <h1>This Web is coded by</h1>
            <TypingEffect
                text={[
                    "K.M. Hasibur Rahman Srijon",
                    "SQL Srijon",
                    "Pseudonym Srijon",
                    "Crisis CreeD"
                ]}
                speed={50}
                eraseSpeed={30}
                eraseDelay={2000}
                typingDelay={500}
                cursorRenderer={cursor => <span className="typing-effect-cursor">{cursor}</span>}
                displayTextRenderer={text => (
                    <h2>{text}</h2>
                )}
            />
        </div>
    );
};

export default Home;
