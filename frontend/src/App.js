import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./landingPage.js";
import Home from "./index.js";
import SignUp from "./signup.js";
import LogIn from "./login.js";
import CreatePost from "./CreatePost.js";
import Settings from "./settings.js";
import ViewPost from "./ViewPost.js";

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
        <Route exact path="/view-post/:id" element={<ViewPost></ViewPost>} />

      </Routes>
    </Router>

  );
}

export default App;
