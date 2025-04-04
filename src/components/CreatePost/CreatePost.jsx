import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import Avatar from "../Avatar/Avatar";
import { fetchProblems } from "../../utils/postProblem";
import {
  hasUserLiked,
  countLikes,
  getUserId,
  toggleLike,
} from "../../utils/likes";

export let updateProblem = () => {};

function CreatePost({ token }) {
  const [comments, setComments] = useState([]); // Array of comments
  const [newComment, setNewComment] = useState(""); // New comment input
  const [likeCounts, setLikeCounts] = useState({});

  const [likedByMe, setLikedByMe] = useState({});

  const handleLike = async (postId) => {
    const userId = await getUserId(token?.user?.id); // UUID → int8
    if (!userId) return;
    await toggleLike(postId, userId);
    const updatedCount = await countLikes(postId);
    setLikeCounts((prev) => ({ ...prev, [postId]: updatedCount }));

    // Toggle likedByMe
    setLikedByMe((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const [problems, setProblems] = useState([]);
  updateProblem = setProblems;
  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);

        const uid = token?.user?.id;
        const userId = await getUserId(uid);

        // Count likes for all problems
        const counts = {};
        const likedStatus = {};
        for (let item of data) {
          const count = await countLikes(item.id);
          counts[item.id] = count;
          const hasLiked = await hasUserLiked(item.id, userId);
          likedStatus[item.id] = hasLiked;
        }
        setLikeCounts(counts);
        setLikedByMe(likedStatus);
      } catch (error) {
        console.error("Error fetching post:", error);
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
                <div
                  className="like-section"
                  onClick={() => handleLike(item.id)}
                >
                  <i
                    className={`fa-heart like-icon ${
                      likedByMe[item.id] ? "fa-solid" : "fa-regular"
                    }`}
                  />
                  <span>{likeCounts[item.id] || 0}</span>
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
