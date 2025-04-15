import React, { useState, useEffect } from "react";
import {
  fetchComments,
  addComment,
  deleteComment,
  upvoteComment,
  hasUserUpvotedComment,
} from "../utils/comments";
import { getUserId } from "../utils/likes";

export default function useComments(token) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const [activeCommentIcon, setActiveCommentICon] = useState(null);

  const [upvotedComments, setUpvotedComments] = useState({});

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId(token?.user?.id);
      setCurrentUserId(id);
    };

    if (token?.user?.id) {
      fetchUserId();
    }
  }, [token]);

  const initializeComments = async (posts) => {
    const commentMap = {};
    const upvotedStatus = {};

    for (let item of posts) {
      const postComments = await fetchComments(item.id);
      commentMap[item.id] = postComments;

      for (let comment of postComments) {
        const userId = await getUserId(token?.user?.id);
        if (!userId) continue;

        const hasUpvoted = await hasUserUpvotedComment(comment.id, userId);
        upvotedStatus[comment.id] = hasUpvoted;
      }
    }
    setComments(commentMap);
    setUpvotedComments(upvotedStatus);

    setLoggedInUserName(
      token.user?.user_metadata?.first_name || "Default Profile"
    );

    // const userId = await getUserId(token?.user?.id);
    // setCurrentUserId(userId);
  };

  const handleCommentClick = async (postId) => {
    setShowComments((prev) => {
      const newState = {};
      // If already open, close it
      if (prev[postId]) {
        return newState;
      }
      // Otherwise open only the clicked one
      newState[postId] = true;
      return newState;
    });

    // Toggle the active icon
    setActiveCommentICon((prev) => (prev === postId ? null : postId));

    if (!comments[postId]) {
      const postComments = await fetchComments(postId);
      setComments((prev) => ({ ...prev, [postId]: postComments }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!newComment[postId]?.trim()) return;

    const userId = await getUserId(token?.user?.id);
    if (!userId) return;

    const comment = await addComment(
      postId,
      userId,
      newComment[postId],
      loggedInUserName
    );
    if (comment) {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment],
      }));
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      const success = await deleteComment(commentId, currentUserId);
      if (success) {
        const updated = comments[postId].filter((c) => c.id !== commentId);
        setComments((prev) => ({ ...prev, [postId]: updated }));
      }
    }
  };

  const handleUpvoteComment = async (commentId, postId, currentUpvotes) => {
    const userId = await getUserId(token?.user?.id);
    if (!userId) return;

    const updated = await upvoteComment(commentId, userId, currentUpvotes);
    if (updated) {
      const updatedList = comments[postId].map((c) =>
        c.id === commentId ? updated : c
      );
      setComments((prev) => ({ ...prev, [postId]: updatedList }));

      // Toggle upvoted state
      setUpvotedComments((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    } else {
      alert("You’ve already upvoted this comment!");
    }
  };

  return {
    loggedInUserName,
    currentUserId,
    showComments,
    comments,
    newComment,
    setNewComment,
    handleCommentClick,
    handleCommentSubmit,
    handleDeleteComment,
    handleUpvoteComment,
    initializeComments,
    activeCommentIcon,
    upvotedComments,
  };
}
