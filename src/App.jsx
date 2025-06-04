import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import Dashboard from './component/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
