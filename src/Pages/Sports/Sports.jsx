import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sports.css";

const Sports = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            const options = {
                method: "GET",
                url: "https://livescore6.p.rapidapi.com/matches/v2/list-live",
                params: {
                    Category: "soccer",
                    Timezone: "-7", // Adjust timezone if needed
                },
                headers: {
                    "x-rapidapi-key":
                        "0501fab9bfmsh7acdc46d6417c28p13c4d7jsnb36c201aca69",
                    "x-rapidapi-host": "livescore6.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                console.log("API Response:", response.data);

                // Adjust according to the actual data structure
                const stages = response.data.Stages || [];
                if (Array.isArray(stages)) {
                    // Extract matches from stages if applicable
                    const allMatches = stages.flatMap(
                        (stage) => stage.matches || []
                    );
                    setMatches(allMatches);
                } else {
                    setError("Unexpected data format received from the API");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("An error occurred while fetching the matches");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="matches-container">
            <h1>Live Soccer Matches</h1>
            {matches.length > 0 ? (
                <ul className="matches-list">
                    {matches.map((match, index) => (
                        <li key={index} className="match-item">
                            <h2>
                                {match.homeTeam} vs {match.awayTeam}
                            </h2>
                            <p>Score: {match.score}</p>
                            <p>Time: {match.time}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No matches are currently live.</p>
            )}
        </div>
    );
};

export default Sports;
