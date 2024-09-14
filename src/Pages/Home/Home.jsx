import React from "react";
import TypingEffect from "react-typing-effect";
import { FaFacebook, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";
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
            <div className="social-icons">
                <a href="https://www.facebook.com/pseudonym.srijon" className="social-icon"><FaFacebook /></a>
                <a href="https://www.instagram.com/sql.srijon" className="social-icon"><FaInstagram /></a>
                <a href="https://github.com/srijon57" className="social-icon"><FaGithub /></a>
                <a href="https://api.whatsapp.com/send?phone=8801671506100" className="social-icon"><FaWhatsapp /></a>
            </div>
        </div>
    );
};

export default Home;
