import React, { useState, useEffect } from "react";
import {
  fetchComments,
  addComment,
  deleteComment,
  upvoteComment,
} from "../utils/comments";
import { getUserId } from "../utils/likes";

export default function useComments(token) {
  const [currentUserId, setCurrentUserId] = useState(null);

  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const initializeComments = async (posts) => {
    const commentMap = {};
    for (let item of posts) {
      const postComments = await fetchComments(item.id);
      commentMap[item.id] = postComments;
    }
    setComments(commentMap);
    setLoggedInUserName(
      token.user?.user_metadata?.first_name || "Default Profile"
    );

    const userId = await getUserId(token?.user?.id);
    setCurrentUserId(userId);
  };

  const handleCommentClick = async (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

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
  };
}
