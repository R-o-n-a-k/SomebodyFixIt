import { supabase } from "../client";
import { toast } from "react-toastify";

// Upload an image to Supabase storage
export const uploadImage = async (file) => {
  if (!file) return null;

  const { data, error } = await supabase.storage
    .from("problem-images")
    .upload(`${file.name}`, file);

  if (error) throw error;
  return data.path; // Return the file path
};

// Insert a problem into Supabase table
export const insertProblem = async ({ description, imageUrl, userName }) => {
  const { error } = await supabase.from("problems").insert([
    {
      description,
      image_url: imageUrl,
      user_name: userName,
    },
  ]);

  if (error) throw error;
};

// Fetch all problems from Supabase
export const fetchProblems = async () => {
  const { data, error } = await supabase.from("problems").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data; // Return fetched problems
};

// Handle posting a problem
export const handlePostSubmit = async (e,{
  problemDescription,
  selectedFile,
  userName,
  onCloseModal,
  setProblemDescription,
  setSelectedFile,
  updateProblem
}) => {
    e.preventDefault();
  try {
    let imageUrl = null;

    // Upload the file if one is provided
    if (selectedFile) {
      imageUrl = await uploadImage(selectedFile);
    }

    // Insert the problem data
    await insertProblem({
      description: problemDescription,
      imageUrl,
      userName,
    });

    const updatedProblems = await fetchProblems(); // Fetch new problems
    updateProblem(updatedProblems);
    toast.success("Problem posted successfully!");
    setProblemDescription("");
    setSelectedFile(null);
    onCloseModal();
  } catch (error) {
    toast.error(`Failed to post problem: ${error.message}`);
  }
};
