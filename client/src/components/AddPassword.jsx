import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";

const AddPassword = () => {
  const { addPassword, isAuth } = useContext(AppContext);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "",
    siteUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { siteName, siteUrl, password } = formData;

    const res = await addPassword(siteName, siteUrl, password);

    if (res?.success) {
      setFormData({ siteName: "", siteUrl: "", password: "" }); // Reset form
    }
    setSaving(false);
  };

  return (
    <>
      {isAuth && (
        <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 w-full max-w-lg rounded-lg shadow-lg p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-6 text-center">
              Add New Password
            </h2>

            {/* Site Name */}
            <div className="mb-4">
              <label
                htmlFor="siteName"
                className="block text-sm text-green-300 mb-1"
              >
                user Name
              </label>
              <input
                type="text"
                name="siteName"
                id="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
                placeholder="e.g., user0001"
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Site URL */}
            <div className="mb-4">
              <label
                htmlFor="siteUrl"
                className="block text-sm text-green-300 mb-1"
              >
                Website URL
              </label>
              <input
                type="url"
                name="siteUrl"
                id="siteUrl"
                value={formData.siteUrl}
                onChange={handleChange}
                required
                placeholder="e.g., https://facebook.com"
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm text-green-300 mb-1"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-800 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className={`
            ${
              saving
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400"
            }
            w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded cursor-pointer transition-all duration-300`}
            >
              Add Password
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddPassword;
