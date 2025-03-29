import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/CSS/MyProfile.css";
import defaultProfile from "../assets/images/default-user.png";
import { useNavigate } from "react-router-dom";
import {
  deleteProfilePic,
  uploadProfileImage,
  updateUserProfile,
  featchUserProfile,
  fetchAuthUserData,
  updateAuthUserData,
} from "../utils/userProfile";

export default function MyProfile({ token }) {
  const navigate = useNavigate();
  const userEmail = token.user?.user_metadata?.email;
  const userId = token?.user?.id; // Extract user_id from the token

  const [name, setName] = useState(""); // State for name
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(defaultProfile);

  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Fetch name from Auth table
  useEffect(() => {
    const loadUserData = async () => {
      const authData = await fetchAuthUserData(); // Fetch name from auth table
      if (authData) {
        setName(authData.name); // Set the initial name
      }
      const userData = await featchUserProfile();
      if (userData) {
        setBio(userData.bio || "Tell us something about you...");
        setPhone(userData.phone || "xxxxxxxxxx");
        setProfileImage(userData.profile_picture || defaultProfile);
      }
    };
    if (userId) loadUserData();
  }, [userId]);

  const handleEditClick = (field) => {
    setEditField(field);
    if (field === "name") setInputValue(name);
    else if (field === "bio") setInputValue(bio);
    else if (field === "phone") setInputValue(phone);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = async () => {
    let success = false;
    if (editField === "name") {
      success = await updateAuthUserData({ name: inputValue });
      if (success) {
        setName(inputValue);
        setEditField(null);
      }
    } else {
      success = await updateUserProfile({ [editField]: inputValue });
      if (success) {
        if (editField === "bio") setBio(inputValue);
        if (editField === "phone") setPhone(inputValue);
        setEditField(null);
      }
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      sessionStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && userId) {
      const imageUrl = await uploadProfileImage(file, userId);
      if (imageUrl) {
        await updateUserProfile({ profile_picture: imageUrl });
        setProfileImage(imageUrl);
      }
    }
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete profile pic?"
    );
    if (confirmDelete) {
      if (userId) {
        const success = await deleteProfilePic(userId);
        if (success) {
          await updateUserProfile({ profile_picture: null });
          setProfileImage(defaultProfile);
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <label htmlFor="profileImage">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-picture"
                  onError={(e) => {
                    e.target.src = defaultProfile;
                  }}
                />
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <button
                className="profile-picture-delete-btn"
                onClick={handleDeleteImage}
                disabled={profileImage === defaultProfile}
              >
                <i className="fa-solid fa-trash" />
              </button>
            </div>

            <div className="profile-detail">
              <div className="my-profile-name">
                <p className="profile-label">Name</p>
                {editField === "name" ? (
                  <div className="edit-field">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      title="FirstName LastName"
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    />
                  </div>
                ) : (
                  <h2 className="profile-name">
                    {name}
                    <span
                      onClick={() => handleEditClick("name")}
                      className="edit-icon"
                    >
                      ✎
                    </span>
                  </h2>
                )}
              </div>

              <div className="my-profile-bio">
                <p className="profile-label">Bio</p>
                {editField === "bio" ? (
                  <div className="edit-field">
                    <textarea
                      value={inputValue}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Write Something about you..."
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    ></i>
                  </div>
                ) : (
                  <p className="profile-bio">
                    {bio}
                    <span
                      onClick={() => handleEditClick("bio")}
                      className="edit-icon"
                    >
                      ✎
                    </span>
                  </p>
                )}
              </div>

              <div className="my-profile-email">
                <p className="profile-label">Email</p>
                <p className="profile-email">{userEmail}</p>
              </div>

              <div className="my-profile-phone">
                <p className="profile-label">Phone</p>
                {editField === "phone" ? (
                  <div className="edit-field">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter your phone"
                      pattern="\d{10}"
                      maxlength="10"
                      title="Phone number must be exactly 10 digits"
                      required
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    />
                  </div>
                ) : (
                  <p className="profile-phone">
                    {phone}
                    <span
                      onClick={() => handleEditClick("phone")}
                      className="edit-icon"
                    >
                      ✎
                    </span>
                  </p>
                )}
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
