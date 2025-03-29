import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import Avatar from "../Avatar/Avatar";
import { fetchProblems } from "../../utils/postProblem";

export let updateProblem = () => {};

function CreatePost({ token }) {
  const [likes, setLikes] = useState(0); // State for like count
  const [comments, setComments] = useState([]); // Array of comments
  const [newComment, setNewComment] = useState(""); // New comment input

  // Function to handle "Like" button click
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const [problems, setProblems] = useState([]);
  updateProblem = setProblems;
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    loadProblems();
  }, []);

  return (
    <>
      <div className="post-section">
        {problems.map((item, index) => (
          <div className="post-content" key={index}>
            <div className="post-profile">
              <Avatar name={item.user_name} className="ask-avatar" />
              <label className="post-profile-name">{item.user_name}</label>
            </div>
            <div className="post-data">{item.description}</div>
            {item.image_url && (
              <img
                src={`${import.meta.env.VITE_SUPABASE_IMAGE_URL}${
                  item.image_url
                }`}
                alt="post-image"
                className="post-image"
              />
            )}
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
