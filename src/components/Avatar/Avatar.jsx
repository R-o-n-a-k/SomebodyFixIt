import React from "react";
import "./Avatar.css";
import { useNavigate } from "react-router-dom";

const Avatar = ({ name }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/my-profile"); // Navigate to My Profile page
  };

  const getInitials = (name) => {
    if (!name) {
      return "NA"; // Return default initials if name is null or undefined
    }
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.slice(0, 2).join("");
  };

  return (
    <div className="avatar" onClick={handleAvatarClick}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
