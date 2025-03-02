import React, { useState } from "react";
import "./UserProfile.css";

const chronicDiseases = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "COPD",
  "Heart Disease",
  "Stroke",
  "Cancer",
  "Arthritis",
  "Chronic Kidney Disease",
  "Alzheimer's Disease",
  "Parkinson's Disease",
  "Epilepsy",
  "HIV/AIDS",
  "Tuberculosis",
  "Hepatitis",
  "Multiple Sclerosis",
  "Lupus",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Cystic Fibrosis",
  "Other"
];

function UserProfile() {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");

  const handleDiseaseChange = (event) => {
    const { value } = event.target;
    setDiseaseInput(value);
  };

  const handleAddDisease = () => {
    if (diseaseInput && !selectedDiseases.includes(diseaseInput)) {
      setSelectedDiseases([...selectedDiseases, diseaseInput]);
      setDiseaseInput("");
    }
  };

  const handleRemoveDisease = (disease) => {
    setSelectedDiseases(selectedDiseases.filter((d) => d !== disease));
  };

  return (
    <div className="user-profile">
      <h1 className="title">User Profile</h1>
      <div className="profile-card">
        <h2>John Doe</h2>
        <p><strong>Gender:</strong> Male</p>
        <p><strong>Age:</strong> 30</p>
        <p><strong>Location:</strong> New York, USA</p>
        <p><strong>Race:</strong> Caucasian</p>
        <p><strong>Past Chronic Diseases:</strong></p>
        <div className="disease-input-container">
          <select value={diseaseInput} onChange={handleDiseaseChange} className="disease-dropdown">
            <option value="" disabled>Select a disease</option>
            {chronicDiseases.map((disease, index) => (
              <option key={index} value={disease}>
                {disease}
              </option>
            ))}
          </select>
          <button onClick={handleAddDisease} className="btn btn-primary ml-2">Add</button>
        </div>
        <ul className="disease-list">
          {selectedDiseases.map((disease, index) => (
            <li key={index} className="disease-item">
              {disease}
              <button onClick={() => handleRemoveDisease(disease)} className="btn btn-danger btn-sm ml-2">Remove</button>
            </li>
          ))}
        </ul>
        <p><strong>History of Trials:</strong></p>
        <ul>
          <li>Trial 1: Diabetes Study</li>
          <li>Trial 2: Hypertension Study</li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;