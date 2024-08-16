import { useState } from 'react'
import Navbar from './Components/Header/Navbar'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Weather from './Pages/Weather/Weather'
import ContextProvider from './Context/WeatherContext'
import AIChat from './Pages/AIChat/AIChat'
import Sports from './Pages/Sports/Sports'
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
    </Routes>
    </ContextProvider>
    </>
  )
}

export default App
