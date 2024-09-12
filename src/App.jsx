import { useState } from 'react'
import Navbar from './Components/Header/Navbar'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Weather from './Pages/Weather/Weather'
import ContextProvider from './Context/WeatherContext'
import AIChat from './Pages/AIChat/AIChat'
import Sports from './Pages/Sports/Sports'
import SoccerGame from './Pages/OnOne/Soccergame'
import Dictionary from './Pages/Dictionary/Dictionary'
import TypingSpeedTest from './Pages/TypingSpeedTest/TypingSpeedTest'
import PrayerTimes from './Pages/PrayerTimes/PrayerTimes'
function App() {

  return (
    <>
    <Navbar/>
    <ContextProvider>
    <Routes>     
                <Route path="/" element={<Home />} />      
                <Route path="/weather" element={<Weather />} />
                <Route path="/aichat" element={<AIChat />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/soccergame" element={<SoccerGame />} />
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/type" element={<TypingSpeedTest />} />
                <Route path="/prayertime" element={<PrayerTimes />} />
    </Routes>
    </ContextProvider>
    </>
  )
}

export default App
