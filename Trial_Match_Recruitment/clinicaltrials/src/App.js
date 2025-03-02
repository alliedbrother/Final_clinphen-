import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TesterPage from "./TesterPage";
import UserPage from "./UserPage";
import UserProfile from "./UserProfile";
import LoginPage from "./login";
import TrialInformation from "./TrialInformation";
import UserRegistration from "./UserRegistration";
import TesterRegistration from "./TesterRegistration";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tester" element={<TesterPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/trialinformation" element={<TrialInformation />} />
          <Route path="/registerUser" element={<UserRegistration />} />
          <Route path="/registerTester" element={<TesterRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;