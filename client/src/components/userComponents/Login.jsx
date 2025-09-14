import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [loggingIn, setLoggingIn] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const result = await login(email, password);
    console.log(result);
    if (result?.success) {
      navigate("/user/dashboard"); // or wherever the user should land after login
    }
    setLoggingIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-sm shadow-xl w-full max-w-md p-6 sm:p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Login
        </h2>

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
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

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
            className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loggingIn}
          className={`
            ${
              loggingIn
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400"
            }
            w-full bg-green-500 cursor-pointer hover:bg-green-600 text-black font-bold py-2 rounded-sm transition-all duration-300`}
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/user/register"
            className="text-green-400 cursor-pointer hover:underline hover:text-green-300"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
