import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { WeatherContext } from "../../Context/WeatherContext";
import "./Weather.css";

const weatherIcons = {
    Clear: "wi-day-sunny",
    Clouds: "wi-cloudy",
    Rain: "wi-rain",
    Drizzle: "wi-rain-mix",
    Thunderstorm: "wi-thunderstorm",
    Snow: "wi-snow",
    Mist: "wi-fog",
    Smoke: "wi-smoke",
    Haze: "wi-day-haze",
    Dust: "wi-dust",
    Fog: "wi-fog",
    Sand: "wi-sandstorm",
    Ash: "wi-volcano",
    Squall: "wi-storm-showers",
    Tornado: "wi-tornado",
};

const Weather = () => {
    const { weather, error, loading, city, setCity, fetchWeather } =
        useContext(WeatherContext);

    const weatherDescription = weather?.weather[0]?.main;
    const iconClass = weatherIcons[weatherDescription];

    const handleSearch = () => {
        fetchWeather(city);
        setCity("");
    };

    const handleKeypress = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    if (loading)
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );

    if (error)
        return (
            <div className="error-container">
                <Icon icon="mdi:alert-circle-outline" className="error-icon" />
                <p className="error-text">{error}</p>
            </div>
        );

    return (
        <div className="weather-container">
            <div className="search-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={handleKeypress}
                    className="search-input"
                    placeholder="Enter City name ..."
                />
                <button
                    onClick={handleSearch}
                    disabled={!city}
                    className="search-button"
                >
                    Search
                </button>
            </div>
            {weather && (
                <div className="weather-card">
                    <p className="city-name">
                        {weather.name},{" "}
                        <span className="country-name">{weather.country}</span>
                    </p>
                    <p className="date">{weather.formattedDate}</p>
                    <div className="weather-icon-container">
                        <Icon icon={iconClass} className="weather-icon" />
                        <div className="temperature-container">
                            <p className="temperature">
                                {weather.main.temp}{" "}
                                <span className="degree">&deg;C</span>
                            </p>
                            <span className="weather-description">
                                {weather.weather[0].description}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Weather;
