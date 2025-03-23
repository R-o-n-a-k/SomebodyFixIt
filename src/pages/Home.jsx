import React from "react";
import Navbar from "../components/Navbar/Navbar";
import AskProblem from "../components/AskProblem/AskProblem";
import CreatePost from "../components/CreatePost/CreatePost";

function Home({ token }) {
  return (
    <>
      <Navbar token={token} />
      <div className="main">
        <AskProblem token={token} />
        <CreatePost token={token} />
      </div>
    </>
  );
}

export default Home;
