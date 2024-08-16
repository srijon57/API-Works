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
                    Timezone: "-7",
                },
                headers: {
                    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_API_KEY,
                    "x-rapidapi-host": "livescore6.p.rapidapi.com",
                },
            };

            try {
                const response = await axios.request(options);
                // console.log("API Response:", response.data);

                // Adjust according to the actual data structure
                const stages = response.data.Stages || [];
                const allMatches = stages.flatMap(stage => stage.Events || []);
                setMatches(allMatches);
            } catch (error) {
                // console.error("Error fetching data:", error);
                setError("An error occurred while fetching the matches");
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) return <div className="spinner"></div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="matches-container">
            <h1>Live Soccer Matches</h1>
            {matches.length > 0 ? (
                <ul className="matches-list">
                    {matches.map((event, index) => (
                        <li key={index} className="match-item">
                            <div className="match-details">
                                <div className="team-info">
                                    <img
                                        src={`https://lsm-static-prod.livescore.com/medium/${event.T1[0]?.Img}`}
                                        width="40"
                                        className="team-logo"
                                        alt={event.T1[0]?.Nm || "Unknown Team"}
                                    />
                                    <p className="team-name">{event.T1[0]?.Nm || "Unknown Team"}</p>
                                </div>
                                <div className="score-info">
                                    <h2>
                                        {event.Tr1} - {event.Tr2}
                                    </h2>
                                    <p>{event.Eps}</p>
                                </div>
                                <div className="team-info">
                                    <img
                                        src={`https://lsm-static-prod.livescore.com/medium/${event.T2[0]?.Img}`}
                                        width="40"
                                        className="team-logo"
                                        alt={event.T2[0]?.Nm || "Unknown Team"}
                                    />
                                    <p className="team-name">{event.T2[0]?.Nm || "Unknown Team"}</p>
                                </div>
                            </div>
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
