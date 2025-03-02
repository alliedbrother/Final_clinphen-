import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";

const TesterRegistration = () => {
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "",
    fda_number: "",
    description: "",
    sex: "",
    age: "",
    race: "",
    past_diseases: "",
    test_type: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.age < 0) {
      newErrors.age = "Age must be a positive number";
    }
    if (formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post("http://localhost:5000/registerTester", formData)
        .then((response) => {
          alert(response.data.message);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error registering!", error);
        });
    }
  };

  return (
    <div className="registration-page flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">Tester Registration</h1>
      <form className="registration-form bg-white p-8 rounded-lg shadow-lg w-80" onSubmit={handleSubmit}>
        <input
          type="text"
          name="organization_name"
          placeholder="Organization Name"
          value={formData.organization_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="organization_type"
          placeholder="Organization Type"
          value={formData.organization_type}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="fda_number"
          placeholder="FDA Number"
          value={formData.fda_number}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="sex"
          value={formData.sex}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
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
          name="race"
          placeholder="Race"
          value={formData.race}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="past_diseases"
          placeholder="Past Diseases"
          value={formData.past_diseases}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="test_type"
          placeholder="Test Type"
          value={formData.test_type}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (days)"
          value={formData.duration}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
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

export default TesterRegistration;