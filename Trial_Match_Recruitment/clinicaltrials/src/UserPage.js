import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./UserPage.css";

const trials = [
  {
    name: "Trial 1",
    description: "This is a description of Trial 1.",
    type: "Type 1",
    duration: "6 months",
    date: "2025-03-01",
    requirements: "Age: 30, Gender: Female, Race: Caucasian, Past Diagnosis Count: 2",
  },
  {
    name: "Trial 2",
    description: "This is a description of Trial 2.",
    type: "Type 2",
    duration: "3 months",
    date: "2025-06-01",
    requirements: "Age: 25, Gender: Male, Race: Asian, Past Diagnosis Count: 1",
  },
  {
    name: "Trial 3",
    description: "This is a description of Trial 3.",
    type: "Type 3",
    duration: "1 year",
    date: "2025-09-01",
    requirements: "Age: 40, Gender: Non-binary, Race: African American, Past Diagnosis Count: 3",
  },
];

function UserPage() {
  const [trialIndex, setTrialIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setTrialIndex((prev) => (prev + 1) % trials.length);
      setSwipeDirection(null);
    }, 300);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleViewProfile = () => {
    navigate("/userprofile");
  };
  
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate("/");
  };
  
  return (
    <div className="user-page">
      <h1 className="title">Select Trials</h1>
      <div className="profile-button-container">
        <button className="notification-button">Notifications</button>
        <button className="profile-button" onClick={handleProfileClick}>
          Profile
        </button>
        {showProfileMenu && (
          <div className="profile-menu">
            <button className="profile-menu-item" onClick={handleViewProfile}>View Profile</button>
            <button className="profile-menu-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="card-container">
        {trialIndex < trials.length && (
          <motion.div
            className="trial-card"
            animate={{ x: swipeDirection === "right" ? 300 : swipeDirection === "left" ? -300 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: swipeDirection ? (swipeDirection === "right" ? "0px 0px 20px green" : "0px 0px 20px red") : "none" }}
          >
            <h2>{trials[trialIndex].name}</h2>
            <p><strong>Description:</strong> {trials[trialIndex].description}</p>
            <p><strong>Type:</strong> {trials[trialIndex].type}</p>
            <p><strong>Duration:</strong> {trials[trialIndex].duration}</p>
            <p><strong>Date:</strong> {trials[trialIndex].date}</p>
            <p><strong>Requirements:</strong> <span className="highlight">{trials[trialIndex].requirements}</span></p>
          </motion.div>
        )}
      </div>
      <div className="button-container">
        <button className="reject-button" onClick={() => handleSwipe("left")}>Reject</button>
        <button className="accept-button" onClick={() => handleSwipe("right")}>Accept</button>
      </div>
    </div>
  );
}

export default UserPage;