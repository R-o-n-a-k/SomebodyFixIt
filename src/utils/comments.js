import { supabase } from "../client";
import { toast } from "react-toastify";

export const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("upvotes", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
  return data || [];
};

export const addComment = async (postId,userId,content,userName)=>{
    const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: userId, content, user_name: userName }])
    .select();

    if (error) {
    console.error("Error adding comment:", error);
    return null;
    }
    toast.success("Comment added sucessfully!")
    return data[0];
}

export const deleteComment = async (commentId, currentUserId) => {
  // Fetch comment to confirm ownership
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    console.error("Error fetching comment for delete:", fetchError);
    return false;
  }

  if (comment.user_id !== currentUserId) {
    toast.error("You can only delete your own comment.");
    return false;
  }

  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) {
    console.error("Error deleting comment:", error);
    return false;
  }

  toast.success("Comment deleted successfully!");
  return true;
};

export const upvoteComment = async (commentId, userId, currentUpvotes) => {
  //  Check if user has already upvoted
  const { data: existingVote, error: checkError } = await supabase
    .from("comments_votes")
    .select("id")
    .eq("user_id", userId)
    .eq("comment_id", commentId)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking vote:", checkError);
    return null;
  }

  if (existingVote) {
    //  Already voted → remove vote
    const { error: deleteError } = await supabase
      .from("comments_votes")
      .delete()
      .eq("id", existingVote.id);

    if (deleteError) {
      console.error("Error removing vote:", deleteError);
      return null;
    }

    // Decrement upvotes
    const { data, error: decError } = await supabase
      .from("comments")
      .update({ upvotes: currentUpvotes - 1 })
      .eq("id", commentId)
      .select()
      .single();

    if (decError) {
      console.error("Error decrementing upvotes:", decError);
      return null;
    }

    return data;
  } else {
    const { error: insertError } = await supabase
      .from("comments_votes")
      .insert([{ user_id: userId, comment_id: commentId }]);

    if (insertError) {
      console.error("Error inserting vote:", insertError);
      return null;
    }

    const { data, error: incError } = await supabase
      .from("comments")
      .update({ upvotes: currentUpvotes + 1 })
      .eq("id", commentId)
      .select()
      .single();

    if (incError) {
      console.error("Error incrementing upvotes:", incError);
      return null;
    }

    return data;
  }
};

export const hasUserUpvotedComment = async (commentId, userId) => {
  const { data, error } = await supabase
    .from("comments_votes")
    .select("id")
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error checking upvote:", error);
    return false;
  }

  return !!data;
};