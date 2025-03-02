import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // Import the custom CSS file

const LoginPage = () => {
  const [role, setRole] = useState(null);
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (role === "Tester") {
      navigate("/tester");
    } else if (role === "User") {
      navigate("/user");
    }
  };

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">Login</h1>
      {!role ? (
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col items-center">
            <button
              className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              onClick={() => setRole("Tester")}
            >
              Tester Login
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/registerTester">
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Create Account as Tester
                </span>
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              onClick={() => setRole("User")}
            >
              User Login
            </button>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/registerUser">
                <span className="text-green-500 hover:underline cursor-pointer">
                  Create Account as User
                </span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="login-card flex flex-col items-center bg-white p-8 rounded-lg shadow-lg w-80">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">{role} Login</h2>
          <input
            type="text"
            name="id"
            placeholder={role === "Tester" ? "Enter TID" : "Enter Username"}
            value={credentials.id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="mt-4 text-sm text-gray-500 hover:underline"
            onClick={() => setRole(null)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;