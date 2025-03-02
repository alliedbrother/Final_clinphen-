import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";

const chronicDiseases = [
  ("Diabetes",
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
    "Other",
    "None")
];

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    race: "",
    chronicDiseases: [],
    trialHistory: "",
  });

  const [errors, setErrors] = useState({});
  const [diseaseInput, setDiseaseInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiseaseChange = (event) => {
    const { value } = event.target;
    setDiseaseInput(value);
  };

  const handleAddDisease = () => {
    if (diseaseInput && !formData.chronicDiseases.includes(diseaseInput)) {
      setFormData({ ...formData, chronicDiseases: [...formData.chronicDiseases, diseaseInput] });
      setDiseaseInput("");
    }
  };

  const handleRemoveDisease = (disease) => {
    setFormData({ ...formData, chronicDiseases: formData.chronicDiseases.filter((d) => d !== disease) });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        axios.post("http://localhost:5000/registerUser", formData)
            .then(response => {
                alert(response.data.message);
                navigate("/");
            })
            .catch(error => {
                console.error("Error registering!", error);
            });
    }
};

  return (
    <div className="registration-page flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">User Registration</h1>
      {/* The form's onSubmit event is set to call handleSubmit */}
      <form className="registration-form bg-white p-8 rounded-lg shadow-lg w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "is-invalid" : ""}`}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="race"
          placeholder="Race"
          value={formData.race}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p><strong>Past Chronic Diseases:</strong></p>
        <div className="disease-input-container">
          <select value={diseaseInput} onChange={handleDiseaseChange} className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" disabled>Select a disease</option>
            {chronicDiseases.map((disease, index) => (
              <option key={index} value={disease}>
                {disease}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddDisease} className="btn btn-primary ml-2">Add</button>
        </div>
        <div className="disease-list d-flex flex-wrap">
          {formData.chronicDiseases.map((disease, index) => (
            <div key={index} className="disease-item d-flex align-items-center bg-light border rounded p-2 m-1">
              {disease}
              <button type="button" onClick={() => handleRemoveDisease(disease)} className="btn btn-link btn-sm ml-2 p-0" style={{ fontSize: '1rem' }}>&times;</button>
            </div>
          ))}
        </div>
        <textarea
          name="trialHistory"
          placeholder="History of Trials (e.g., Trial 1: Hypertension, Trial 2: Diabetes Study)"
          value={formData.trialHistory}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit" // This triggers the form submission and calls handleSubmit
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account? <Link to="/" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default UserRegistration;