import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [regisitering, setRegisitering] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisitering(true);
    const result = await register(name, email, password);
    if (result.success) navigate("/user/login");
    setRegisitering(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md p-6 sm:p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Sign Up
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-green-300 mb-1"
          >
            Name
          </label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-green-300 mb-1"
          >
            Email
          </label>
          <input
            value={email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-green-300 mb-1"
          >
            Password
          </label>
          <input
            value={password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            required
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={regisitering}
          className={`
            ${
              regisitering
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400"
            }
            w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded cursor-pointer transition-all duration-300`}
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-green-400 hover:underline hover:text-green-300 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
