import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./landingPage.js";
import Home from "./index.js";
import SignUp from "./signup.js";
import LogIn from "./login.js";
import CreatePost from "./createPost.js";
import Settings from "./settings.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage></LandingPage>} />
        <Route exact path="/dashboard" element={<Home></Home>} />
        <Route exact path="/signup" element={<SignUp></SignUp>} />
        <Route exact path="/login" element={<LogIn></LogIn>} />
        <Route exact path="/create-post" element={<CreatePost></CreatePost>} />
        <Route exact path="/settings" element={<Settings></Settings>} />

      </Routes>
    </Router>

  );
}

export default App;
