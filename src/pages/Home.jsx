import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AskProblem from "../components/AskProblem/AskProblem";
import CreatePost from "../components/CreatePost/CreatePost";

function Home({ token }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <Navbar token={token} onSearch={handleSearch} />
      <div className="main">
        <AskProblem token={token} />
        <CreatePost token={token} searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default Home;
