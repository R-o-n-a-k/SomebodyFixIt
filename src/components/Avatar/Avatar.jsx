import React from "react";
import "./Avatar.css";

const Avatar = ({ name }) => {
  const getInitials = (name) => {
    if (!name) {
      return "NA"; // Return default initials if name is null or undefined
    }
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.slice(0, 2).join("");
  };

  return <div className="avatar">{getInitials(name)}</div>;
};

export default Avatar;
