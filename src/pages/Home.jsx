import React from "react";
import Navbar from "../components/Navbar/Navbar";
import AskProblem from "../components/AskProblem/AskProblem";
import CreatePost from "../components/CreatePost/CreatePost";

function Home() {
  return (
    <>
      <Navbar />
      <div className="main">
        <AskProblem />
        <CreatePost />
      </div>
    </>
  );
}

export default Home;
