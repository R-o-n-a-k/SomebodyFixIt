import { supabase } from "../client";
import { toast } from "react-toastify";

export const initialFormValues = {
  signUpName: "",
  signUpEmail: "",
  signUpPswd: "",
  loginEmail: "",
  loginPswd: "",
};

export const handleInputChange = (formValues, setFormValues) => (e) => {
  const { name, value } = e.target;
  setFormValues({ ...formValues, [name]: value });
};

export const handleFormSubmit = async (e, formValues, setFormValues) => {
  e.preventDefault();
  const { signUpName, signUpEmail, signUpPswd } = formValues;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPswd,
      options: {
        data: {
          first_name: signUpName,
        },
      },
    });
    if (error) throw error;
    toast.success("Details registered successfully");
    setFormValues({
      signUpName: "",
      signUpEmail: "",
      signUpPswd: "",
    });
  } catch (error) {
    toast.error(`Error signing up: ${error.message}`);
  }
};

export const handleLogin = async (
  e,
  formValues,
  setFormValues,
  setToken,
  navigate
) => {
  e.preventDefault();
  const { loginEmail, loginPswd } = formValues;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPswd,
    });
    if (error) throw error;
    toast.success("User Login Successful!");
    setFormValues({
      loginEmail: "",
      loginPswd: "",
    });
    setToken(data);
    navigate("/home");
  } catch (error) {
    toast.error(`Error logging in: ${error.message}`);
  }
};