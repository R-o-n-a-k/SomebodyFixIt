import { supabase } from "../client";

export const getUserId = async (uuid) => {
  try {
    const { data, error } = await supabase
      .from("user-profile") // Make sure this matches your table name
      .select("id") // `id` is the int8 (primary key) you want
      .eq("uid", uuid) // `uid` is assumed to be the UUID from Supabase Auth
      .single();

    if (error || !data) {
      console.error("Error fetching user ID:", error);
      return null;
    }

    return data.id; // This is the int8 user_id
  } catch (err) {
    console.error("Unexpected error in getUserId:", err);
    return null;
  }
};

export const hasUserLiked = async (postId, userId) => {
    try {
    const { data, error } = await supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error checking if user liked post:", error);
      return false;
    }

    return data !== null;
  } catch (err) {
    console.error("Unexpected error in hasUserLiked:", err);
    return false;
  }

};

export const toggleLike = async (postId, userId) => {
  const alreadyLiked = await hasUserLiked(postId, userId);

  if (alreadyLiked) {
    // Unlike (delete)
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);
    
    if (error) {
      console.error("Error unliking post:", error);
    }
  } else {
    // Like (insert)
    const { error } = await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: userId }]);

    if (error) {
      console.error("Error liking post:", error);
    }
  }
};

export const countLikes = async (postId) => {
  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  return count || 0;
};
