import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import lineMdSearch from "@iconify-icons/line-md/search";
import "./PrayerTimes.css";
import Spinner from "../../Components/Spinner/Spinner";

const ALADHAN_API_BASE_URL = "https://api.aladhan.com/v1/timingsByCity";
const OPENWEATHERMAP_API_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";

const LocaleClock = () => {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );

    const [currentDate, setCurrentDate] = useState(
        new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    );

    const [hijriDate, setHijriDate] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const timestamp = new Date().getTime();
            const updatedTime = new Date(timestamp);
            setCurrentTime(updatedTime.toLocaleTimeString());
            setCurrentDate(
                updatedTime.toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
            );
        }, 1000);

        // Fetch Hijri date
        axios
            .get("https://api.aladhan.com/v1/gToH")
            .then((response) => {
                const { data } = response;
                const hijri = data.data.hijri;
                setHijriDate(
                    ` ${hijri.year} / ${hijri.month.number} / ${hijri.day} `
                );
            })
            .catch((error) => {
                console.error("Error fetching Hijri date:", error);
            });

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="locale-clock">
            <span className="locale-clock-label">Local Time</span>
            <span className="locale-clock-time">{currentTime}</span>
            <span className="locale-clock-date">{currentDate}</span>
            {hijriDate && (
                <span className="locale-clock-hijri-date">({hijriDate})</span>
            )}
        </div>
    );
};

const PrayerTimesApp = () => {
    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [locationName, setLocationName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value === "") return;
        setIsLoading(true);
        searchForLocation(inputRef.current.value);
    };

    const searchForLocation = async (city) => {
        setIsError(false); 
        try {
            const geoResponse = await axios.get(OPENWEATHERMAP_API_BASE_URL, {
                params: {
                    q: city,
                    appid: import.meta.env.VITE_WEATHER_API_KEY,
                },
            });
    
            if (geoResponse.data.length === 0) {
                throw new Error("City not found");
            }
    
            const { name: cityName, country } = geoResponse.data[0];
    
            const response = await axios.get(ALADHAN_API_BASE_URL, {
                params: {
                    city: cityName,
                    country,
                },
            });
    
            const data = response.data.data;
            const {
                Fajr,
                Sunrise,
                Dhuhr,
                Asr,
                Maghrib,
                Isha,
                Midnight,
                Sunset,
            } = data.timings;
            setPrayerTimes({
                Fajr,
                Sunrise,
                Dhuhr,
                Asr,
                Maghrib,
                Isha,
                Midnight,
                Sunset,
            });
    
            setLocationName({ city: cityName, country });
        } catch (err) {
            console.error(err);
            setIsLoading(false);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="prayer-times-app">
            <header>
                <nav>
                    <LocaleClock />
                    <form onSubmit={handleSubmit}>
                        <div className="prayersearch">
                            <input
                                ref={inputRef}
                                className="prayer-search-input"
                                placeholder="Enter city name"
                                type="text"
                                name="search"
                            />
                            <button type="submit" className="prayer-search-button">
                                <Icon icon={lineMdSearch} />
                            </button>
                        </div>
                    </form>
                </nav>
            </header>
            {isLoading ? (
                <Spinner/>
            ) : isError ? (
                <div className="error">Error fetching data</div>
            ) : (
                <main>
                    {locationName ? (
                        <>
                            <h1>
                                {locationName.city}, {locationName.country}
                            </h1>
                            <ul className="prayer-times-list">
                                {prayerTimes &&
                                    Object.entries(prayerTimes).map(
                                        ([name, time]) => (
                                            <li
                                                key={name}
                                                className="prayer-time-item"
                                            >
                                                <span className="prayer-name">
                                                    {name}:
                                                </span>
                                                <span className="prayer-time">
                                                    {time}
                                                </span>
                                            </li>
                                        )
                                    )}
                            </ul>
                        </>
                    ) : (
                        <h1>Enter a city name to search</h1>
                    )}
                </main>
            )}
        </div>
    );
};

export default PrayerTimesApp;
