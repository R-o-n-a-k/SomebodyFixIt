import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import Avatar from "../Avatar/Avatar";
import { fetchProblems, deleteProblemById } from "../../utils/postProblem";
import useLikes from "../useLikes";
import useComments from "../useComments";
import { toast } from "react-toastify";

export let updateProblem = () => {};

function CreatePost({ token }) {
  const [problems, setProblems] = useState([]);
  updateProblem = setProblems;

  const { likeCounts, likedByMe, handleLike, initializeLikes } =
    useLikes(token);

  const {
    loggedInUserName,
    currentUserId,
    showComments,
    comments,
    newComment,
    handleCommentClick,
    handleCommentSubmit,
    handleDeleteComment,
    handleUpvoteComment,
    setNewComment,
    initializeComments,
  } = useComments(token);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const data = await fetchProblems();
        setProblems(data);
        await initializeLikes(data);
        await initializeComments(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    loadProblems();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmPostDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmPostDelete) {
      try {
        await deleteProblemById(postId);
        setProblems((prev) => prev.filter((p) => p.id !== postId));
        toast.success("Post deleted sucessfully");
      } catch (error) {
        toast.error("Failed to delete post");
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <>
      <div className="post-section">
        {problems.map((item, index) => (
          <div className="post-content" key={index}>
            {item.user_id === currentUserId && (
              <button
                className="post-delete-btn"
                onClick={() => handleDeletePost(item.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
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
                <div
                  className="comment-section"
                  onClick={() => handleCommentClick(item.id)}
                >
                  <i className="fa-solid fa-comments comment-icon" />
                  <span>{comments[item.id]?.length || 0}</span>
                </div>
              </div>
              <div className="comment-wrapper">
                {showComments[item.id] && (
                  <>
                    <div className="comment-box">
                      <Avatar
                        name={loggedInUserName}
                        className="comment-avatar"
                      />
                      <textarea
                        value={newComment[item.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder="Write a comment..."
                        className="comment-textarea"
                      />
                      <button
                        className="comment-submit"
                        onClick={() => handleCommentSubmit(item.id)}
                      >
                        <i className="fa-solid fa-arrow-right" />
                      </button>
                    </div>

                    <div className="comment-list">
                      {(() => {
                        const allComments = comments[item.id] || [];
                        if (allComments.length === 0) return null;

                        const topComment = allComments.reduce(
                          (max, c) => (c.upvotes > max.upvotes ? c : max),
                          allComments[0]
                        );

                        const restComments = allComments.filter(
                          (c) => c.id !== topComment.id
                        );

                        return (
                          <>
                            <div
                              key={topComment.id}
                              className="single-comment pinned-comment"
                            >
                              <Avatar
                                name={topComment.user_name}
                                className="comment-avatar"
                              />
                              <span>{topComment.content}</span>
                              <div className="comment-actions">
                                <span>{topComment.upvotes || 0}</span>
                                <button
                                  className="upvote-btn"
                                  onClick={() =>
                                    handleUpvoteComment(
                                      topComment.id,
                                      item.id,
                                      topComment.upvotes || 0
                                    )
                                  }
                                >
                                  <i className="fa-solid fa-thumbs-up" />
                                </button>

                                {topComment.user_id === currentUserId && (
                                  <button
                                    className="delete-btn"
                                    onClick={() =>
                                      handleDeleteComment(
                                        topComment.id,
                                        item.id
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-trash" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {restComments.map((comment) => (
                              <div key={comment.id} className="single-comment">
                                <Avatar
                                  name={comment.user_name}
                                  className="comment-avatar"
                                />
                                <span>{comment.content}</span>
                                <div className="comment-actions">
                                  <span>{comment.upvotes || 0}</span>
                                  <button
                                    className="upvote-btn"
                                    onClick={() =>
                                      handleUpvoteComment(
                                        comment.id,
                                        item.id,
                                        comment.upvotes || 0
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-thumbs-up" />
                                  </button>

                                  {comment.user_id === currentUserId && (
                                    <button
                                      className="delete-btn"
                                      onClick={() =>
                                        handleDeleteComment(comment.id, item.id)
                                      }
                                    >
                                      <i className="fa-solid fa-trash" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </>
                        );
                      })()}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CreatePost;
