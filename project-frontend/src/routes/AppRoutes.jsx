import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from '../components/Navbar/navbar'
import Footer from '../components/Footer/footer' // import footer component

import Home from '../pages/Home/home'
import Program from '../pages/Program/Program'
import Event from '../pages/Event/event'
import Career from '../pages/Career/career'
import About from '../pages/About/About'
import Streaming from '../pages/live_streaming/streaming'

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* program list/landing and detail share the same component; slug param toggles content */}
        <Route path="/program" element={<Program />} />
        <Route path="/program/:slug" element={<Program />} />
        <Route path="/event" element={<Event />} />
        <Route path="/karir" element={<Career />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/live" element={<Streaming />} />
        {/* add more routes as needed */}
      </Routes>

      <Footer />
    </Router>
  )
}
