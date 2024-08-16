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
                <button onClick={handleSendMessage} disabled={generatingAnswer}>Send</button>
            </div>
        </div>
    );
};

export default AIChat;
