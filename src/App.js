import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./profile";
import { ContextProvider } from "./auth";

function App() {

  return (

    <Router>
    <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </ContextProvider>
    </Router>

  )

}

export default App;
