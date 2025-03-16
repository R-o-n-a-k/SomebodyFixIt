import React, { useState } from "react";
import "./CreatePost.css";
import Avatar from "../Avatar/Avatar";
import { postData } from "./PostData";

function CreatePost() {
  const [likes, setLikes] = useState(0); // State for like count
  const [comments, setComments] = useState([]); // Array of comments
  const [newComment, setNewComment] = useState(""); // New comment input

  // Function to handle "Like" button click
  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <>
      <div className="post-section">
        {postData.map((item) => (
          <div className="post-content">
            <div className="post-profile">
              <Avatar name={item.name} className="ask-avatar" />
              <label className="post-profile-name">{item.name}</label>
            </div>
            <div className="post-data">{item.detail}</div>
            {/* <div className="post-solution">
              <div className="post-solution-box-comment"></div>
              <div className="post-solution-upload">{item.link}</div>
            </div> */}

            <div className="post-solution">
              <div className="post-solution-likes-comments">
                <div className="like-section" onClick={handleLike}>
                  <i className="fa-regular fa-heart like-icon" />
                  <span>{likes}</span>
                </div>
                <div className="comment-section">
                  <i className="fa-solid fa-comments comment-icon" />
                  <span>{comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CreatePost;
