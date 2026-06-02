import { useState } from "react";
import {
  countLikes,
  hasUserLiked,
  toggleLike,
  getUserId,
} from "../utils/likes";

export default function useLikes(token) {
  const [likeCounts, setLikeCounts] = useState({});
  const [likedByMe, setLikedByMe] = useState({});

  const handleLike = async (postId) => {
    const userId = await getUserId(token?.user?.id);
    if (!userId) return;

    await toggleLike(postId, userId);
    const updatedCount = await countLikes(postId);
    setLikeCounts((prev) => ({ ...prev, [postId]: updatedCount }));
    setLikedByMe((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const initializeLikes = async (posts) => {
    const uid = token?.user?.id;
    const userId = await getUserId(uid);

    // Fetch all counts in parallel
    const countPromises = posts.map((p) => countLikes(p.id));
    const countsArr = await Promise.all(countPromises);
    const counts = posts.reduce((acc, p, i) => {
      acc[p.id] = countsArr[i] || 0;
      return acc;
    }, {});

    // Fetch liked status in parallel if we have a userId
    let likedStatus = {};
    if (userId) {
      const likedPromises = posts.map((p) => hasUserLiked(p.id, userId));
      const likedArr = await Promise.all(likedPromises);
      likedStatus = posts.reduce((acc, p, i) => {
        acc[p.id] = !!likedArr[i];
        return acc;
      }, {});
    } else {
      likedStatus = posts.reduce((acc, p) => ((acc[p.id] = false), acc), {});
    }

    setLikeCounts(counts);
    setLikedByMe(likedStatus);
  };

  return {
    likeCounts,
    likedByMe,
    handleLike,
    initializeLikes,
  };
}
