import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import ToastAlert from "./components/ToastAlert";

const Home = lazy(() => import("./pages/Home"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <>
      <h1 className="visually-hidden">
        SomebodyFixIt - Post Problems & Get Solutions
      </h1>
      <h2 className="visually-hidden">Explore and have fun!</h2>
      <ToastAlert />
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            {token ? (
              <Route path="/home" element={<Home token={token} />} />
            ) : (
              ""
            )}
            <Route path="/" element={<LoginRegister setToken={setToken} />} />
            <Route path="/my-profile" element={<MyProfile token={token} />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
