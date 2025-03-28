import { supabase } from "../client";
import { toast } from "react-toastify";
import defaultProfile from "../../src/assets/images/default-user.png";

export const fetchAuthUserData = async () => {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      toast.error(`Error fetching auth data: ${authError.message}`);
      throw new Error(authError.message);
    }

    const { user_metadata: userMetaData } = authData.user || {};
    const firstName = userMetaData?.first_name || "User Name"; 
    return { name: firstName };
  } catch (error) {
    console.error(`Error fetching auth data: ${error.message}`);
    return null;
  }
};

export const updateAuthUserData = async (updatedData) => {
  try {
   
    const { data, error } = await supabase.auth.updateUser({
      data: { first_name: updatedData.name }, // Update name in user_metadata
    });

    if (error) {
      toast.error(`Error updating name: ${error.message}`);
      return null;
    }

    toast.success("Name updated successfully!");
    return data;
  } catch (error) {
    console.error(`Error updating name: ${error.message}`);
    return null;
  }
};

export const featchUserProfile=async()=>{
  try{
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const userId = authData.user?.id;
    const {data:profileData,error:profileError }=await supabase
    .from("user-profile")
    .select("bio,phone,profile_picture,uid")
    .eq("uid",userId)
    .single();
    
    if (profileError) {
      if (profileError.code === "PGRST116") {
        const defaultProfileData = {
          uid: userId,
          bio: "Write something about you...",
          phone: "xxxxxxxxxx",
          profile_picture: defaultProfile,
        };

        const { error: insertError } = await supabase
          .from("user-profile")
          .upsert(defaultProfileData, { onConflict: ["uid"] });

        if (insertError) {
          toast.error(`Error creating default profile: ${insertError.message}`);
          return null;
        }

        return defaultProfileData; 
      } else {
        toast.error(`Error fetching profile data: ${profileError.message}`);
        throw new Error(profileError.message);
      }
    }
    return profileData; 

  }
  catch(error){
    toast.error(`Error fetching data: ${error.message}`);
     return null;
  }

};

export const updateUserProfile = async (updatedData) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const userId = authData.user?.id;

    if (!userId) {
      toast.error("User not authenticated.");
      return null;
    }
   const { error } = await supabase
      .from("user-profile")
      .update(updatedData)
      .eq("uid", userId);

    if (error) {
      toast.error(`Error updating profile: ${error.message}`);
      return null;
    }

    toast.success("Profile updated successfully!");
    return true;
  } catch (error) {
    console.error(`Error updating profile: ${error.message}`);
    toast.error(`Error: ${error.message}`);
    return null;
  }
};


export const uploadProfileImage = async (file, userId) => {
    if (!file || !userId) {
    toast.error("Invalid file or user ID.");
    return null;
  }

  try {
    const fileExt = file.name.split(".").pop();
    const timestamp = Date.now();
    const fileName = `${userId}_${timestamp}.${fileExt}`;
    
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      toast.error("User authentication failed.");
      return null;
    }

    const { data, error } = await supabase.storage
      .from("profile-pic") 
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error(`Image upload failed: ${error.message}`);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile-pic").getPublicUrl(fileName);

    return publicUrl; 
   
  } catch (error) {
    console.error(`Error uploading image: ${error.message}`);
    toast.error("An error occurred while uploading the image.");
    return null;
  }
};
  
  export const deleteProfilePic = async (userId) => {
    try {
      if (!userId) {
        alert("Invalid user ID.");
        return false;
    }

    const { data: fileList, error: listError } = await supabase.storage
      .from("profile-pic") 
      .list();

    if (listError) {
      console.error("Error listing files:", listError.message);
      toast.error(`Error listing files: ${listError.message}`);
      return false;
    }

    const userFile = fileList.find((file) =>
      file.name.startsWith(`${userId}_`)
    );

    if (!userFile) {
      toast.error("No profile picture found to delete.");
      return false;
    }

    const filePath = `${userFile.name}`;

    const { error: deleteError } = await supabase.storage
      .from("profile-pic")
      .remove([filePath]);

    if (deleteError) {
      console.error("Error deleting file:", deleteError.message);
      toast.error(`Error deleting file: ${deleteError.message}`);
      return false;
    }
    toast.success("Profile picture deleted successfully!");
    return true;
  } catch (error) {
    console.error("An error occurred while deleting the image:", error.message);
    toast.error("An unexpected error occurred.");
    return false;
  }

  };
