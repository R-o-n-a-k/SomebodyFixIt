import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../components/CSS/MyProfile.css";

export default function MyProfile() {
  const [profileData, setProfileData] = useState({
    name: "Ronak Patel",
    bio: "Tech Enthusiast",
    email: "ronakpatel@example.com",
    phone: "+91 912345678",
    profilePicture: "https://dummyimage.com/400x400/5e60e9/ffffff&text=RP",
  });

  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleEditClick = (field) => {
    setEditField(field);
    setInputValue(profileData[field]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    setProfileData({ ...profileData, [editField]: inputValue });
    setEditField(null);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileData({ ...profileData, profilePicture: imageURL });
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
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
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
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    />
                  </div>
                ) : (
                  <h2 className="profile-name">
                    {profileData.name}
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
                    {profileData.bio}
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
                {editField === "email" ? (
                  <div className="edit-field">
                    <input
                      type="email"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    />
                  </div>
                ) : (
                  <p className="profile-email">
                    {profileData.email}
                    <span
                      onClick={() => handleEditClick("email")}
                      className="edit-icon"
                    >
                      ✎
                    </span>
                  </p>
                )}
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
                    />
                    <i
                      class="fa-solid fa-check edit-field-save"
                      onClick={handleSaveClick}
                    />
                  </div>
                ) : (
                  <p className="profile-phone">
                    {profileData.phone}
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
