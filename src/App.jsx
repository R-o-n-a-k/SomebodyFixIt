import React from "react";
import "./App.css";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import LoginRegister from "./pages/LoginRegister";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
