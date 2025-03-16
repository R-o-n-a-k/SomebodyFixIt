import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const Home = lazy(() => import("./pages/Home"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<LoginRegister />} />
            <Route path="/my-profile" element={<MyProfile />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
