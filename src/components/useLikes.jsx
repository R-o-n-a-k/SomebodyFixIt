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
    const counts = {};
    const likedStatus = {};

    for (let item of posts) {
      const count = await countLikes(item.id);
      counts[item.id] = count;
      const hasLiked = await hasUserLiked(item.id, userId);
      likedStatus[item.id] = hasLiked;
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
