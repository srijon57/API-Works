import React from "react";

const SoccerGame = () => {
    return (
        <div style={{ overflow: "hidden", width: "100%", height: "100vh" }}>
            <iframe
                src="https://ubg98.github.io/1On1Soccer/"
                title="1On1Soccer"
                style={{ width: "100%", height: "100%", border: "none" }}
            ></iframe>
        </div>
    );
};

export default SoccerGame;
