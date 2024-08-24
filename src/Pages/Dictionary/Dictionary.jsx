import React, { useState, useEffect } from "react";
import "./Dictionary.css";

const Dictionary = () => {
    const [word, setWord] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="dictionary">
            <div className="Dict">
                <span>D</span>
                <span>i</span>
                <span>c</span>
                <span>t</span>
                <span>i</span>
                <span>o</span>
                <span>n</span>
                <span>a</span>
                <span>r</span>
                <span>y</span>
            </div>

            <div className="dictionary-container">
                <form onSubmit={handleSubmit} className="dictionary-form">
                    <input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Enter a word"
                        className="dictionary-input"
                    />
                    <button type="submit" className="dictionary-button">
                        Search
                    </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p className="dictionary-error">{error}</p>}
                {data && (
                    <div className="dictionary-results">
                        <h2>{data[0].word}</h2>
                        <p>{data[0].phonetic}</p>
                        {data[0].meanings.map((meaning, index) => (
                            <div key={index} className="dictionary-meaning">
                                <h3>{meaning.partOfSpeech}</h3>
                                <ul>
                                    {meaning.definitions.map(
                                        (definition, defIndex) => (
                                            <li
                                                key={defIndex}
                                                className="dictionary-definition"
                                            >
                                                {definition.definition}
                                                {definition.example && (
                                                    <p className="dictionary-example">
                                                        {definition.example}
                                                    </p>
                                                )}
                                            </li>
                                        )
                                    )}
                                </ul>
                                {meaning.synonyms.length > 0 && (
                                    <div className="dictionary-synonyms">
                                        <strong>Synonyms:</strong>{" "}
                                        {meaning.synonyms.join(", ")}
                                    </div>
                                )}
                                {meaning.antonyms.length > 0 && (
                                    <div className="dictionary-antonyms">
                                        <strong>Antonyms:</strong>{" "}
                                        {meaning.antonyms.join(", ")}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dictionary;
