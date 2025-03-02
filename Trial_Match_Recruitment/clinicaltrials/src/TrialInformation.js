import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrialInformation.css";

function TrialInformation() {
  const [showPopup, setShowPopup] = useState(false);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    name: "",
    duration: "",
    date: "",
    organization: "",
    organizationType: "",
    fdaNo: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest({ ...newTest, [name]: value });
  };

  const handleAddTest = () => {
    setTests([...tests, newTest]);
    setNewTest({ name: "", duration: "", date: "", organization: "", organizationType: "", fdaNo: "" });
    setShowPopup(false);
  };

  const handleRemoveTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleHomeClick = () => {
    navigate("/tester");
  };

  return (
    <div className="trial-information">
      <button className="home-button" onClick={handleHomeClick}>Home</button>
      <h1 className="title">Trial Information</h1>
      <div className="content">
        <div className="left-side">
          <div className="trial-card">
            <h2>Healthcare United States trial conduction</h2>
            <p><strong>Organization Name: </strong>Healthcare United States</p>
            <p><strong>Organization Type: </strong>Profit/Non-profit</p>
            <p><strong>FDA No.: </strong> 123456</p>
            <button className="create-test-button" onClick={() => setShowPopup(true)}>Create Test</button>
          </div>
        </div>
        <div className="right-side">
          
          <div className="test-list">
            {tests.map((test, index) => (
              <div key={index} className="test-card">
                <div className="test-card-content">
                  <h3>{test.name}</h3>
                  <p><strong>Duration:</strong> {test.duration}</p>
                  <button className="remove-button" onClick={() => handleRemoveTest(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Add New Test Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Test Name"
              value={newTest.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={newTest.duration}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={newTest.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={newTest.organization}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="organizationType"
              placeholder="Organization Type"
              value={newTest.organizationType}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="fdaNo"
              placeholder="FDA No."
              value={newTest.fdaNo}
              onChange={handleInputChange}
            />
            <button className="add-button" onClick={handleAddTest}>Add</button>
            <button className="close-button" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrialInformation;