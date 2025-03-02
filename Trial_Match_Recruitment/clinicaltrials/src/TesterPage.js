import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { findMatches } from "./match";
import "./TesterPage.css";

const users = [
  { name: "Sanjyot", age: 30, gender: "Male", race: "Caucasian", bmi: 24.5, history: "None", height: "5'9\"", weight: "160 lbs" },
  { name: "Rutika", age: 25, gender: "Female", race: "Asian", bmi: 22.3, history: "None", height: "5'5\"", weight: "130 lbs" },
  { name: "Aishwarya", age: 40, gender: "Non-binary", race: "African American", bmi: 27.8, history: "None", height: "5'7\"", weight: "180 lbs" },
];

const testers = [
  { name: "Tester1", trial: "Trial 1", criteria: { age: 30, gender: "Male" } },
  { name: "Tester2", trial: "Trial 2", criteria: { age: 25, gender: "Female" } },
  { name: "Tester3", trial: "Trial 3", criteria: { age: 40, gender: "Non-binary" } },
];

const trials = ["Trial 1", "Trial 2", "Trial 3"];

function TesterPage() {
  const [userIndex, setUserIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [selectedTrial, setSelectedTrial] = useState(trials[0]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userAcceptances = {
      "Sanjyot": { "Trial 1": true, "Trial 2": false, "Trial 3": true },
      "Rutika": { "Trial 1": true, "Trial 2": true, "Trial 3": false },
      "Aishwarya": { "Trial 1": false, "Trial 2": true, "Trial 3": true }
    };
    const testerAcceptances = {
      "Trial 1": { "Sanjyot": true, "Rutika": true, "Aishwarya": false },
      "Trial 2": { "Sanjyot": false, "Rutika": true, "Aishwarya": true },
      "Trial 3": { "Sanjyot": true, "Rutika": false, "Aishwarya": true }
    };

    const matchedUsers = findMatches(users, testers, userAcceptances, testerAcceptances);
    setMatches(matchedUsers);
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      setUserIndex((prev) => (prev + 1) % matches.length);
      setSwipeDirection(null);
    }, 300);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleTrialChange = (event) => {
    setSelectedTrial(event.target.value);
  };

  const handleTestInformation = () => {
    navigate("/trialinformation");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="tester-page">
      <h1 className="title">Select Users for Trials</h1>
      {matches.length > 0 && (
        <div className="highest-match-score">
          <p>Match Score: {matches[0].matchPercentage}%</p>
        </div>
      )}
      <div className="profile-button-container">
        <button className="profile-button" onClick={handleProfileClick}>
          Profile
        </button>
        {showProfileMenu && (
          <div className="profile-menu">
            <button className="profile-menu-item" onClick={handleTestInformation}>Test Information</button>
            <button className="profile-menu-item" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="dropdown-container">
        <select className="trial-dropdown" value={selectedTrial} onChange={handleTrialChange}>
          {trials.map((trial, index) => (
            <option key={index} value={trial}>
              {trial}
            </option>
          ))}
        </select>
      </div>
      <div className="card-container">
        {userIndex < matches.length && (
          <motion.div
            className="demographic-card"
            animate={{ x: swipeDirection === "right" ? 300 : swipeDirection === "left" ? -300 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: swipeDirection ? (swipeDirection === "right" ? "0px 0px 20px green" : "0px 0px 20px red") : "none" }}
          >
            <h2>Participant Demographics</h2>
            <p><strong>Name:</strong> {matches[userIndex].user.name}</p>
            <p><strong>Age:</strong> {matches[userIndex].user.age}</p>
            <p><strong>Gender:</strong> {matches[userIndex].user.gender}</p>
            <p><strong>Race:</strong> {matches[userIndex].user.race}</p>
            <p><strong>Height:</strong> {matches[userIndex].user.height}</p>
            <p><strong>Weight:</strong> {matches[userIndex].user.weight}</p>
            <p><strong>History of Trials:</strong> {matches[userIndex].user.history}</p>
            <p><strong>Match Percentage:</strong> {matches[userIndex].matchPercentage}%</p>
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

export default TesterPage;