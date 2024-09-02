import React, { useState } from "react";
import axios from "axios";
import "./AIChat.css";

const AIChat = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [input, setInput] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: "user", text: input }];
            setMessages(newMessages);

            setGeneratingAnswer(true);

            try {
                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
                        import.meta.env.VITE_GEMINI_API_KEY
                    }`,
                    {
                        contents: [{ parts: [{ text: input }] }],
                    }
                );

                const apiAnswer = response.data.candidates[0].content.parts[0].text;
                setMessages([...newMessages, { sender: "bot", text: apiAnswer }]);
            } catch (error) {
                console.log(error);
                setMessages([...newMessages, { sender: "bot", text: "Sorry - Something went wrong. Please try again!" }]);
            }

            setGeneratingAnswer(false);
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
                {generatingAnswer && <div className="message bot">Loading your answer... </div>}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} disabled={generatingAnswer}>
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    fill="currentColor"
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <span>Send</span>
                </button>
            </div>
        </div>
    );
};

export default AIChat;
