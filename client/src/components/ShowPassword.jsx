import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const ShowPassword = () => {
  const { userPasswords, token, relod, setRelod, isAuth } =
    useContext(AppContext);
  const baseUrl = "http://localhost:4000/api";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?"))
      return;

    try {
      const res = await axios.delete(`${baseUrl}/password/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
      });

      if (res.data.success) {
        toast.success("Password deleted successfully!");
        setRelod(Date.now());
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      {isAuth && (
        <section className="bg-black min-h-screen py-10 px-4 md:px-20 text-white">
          <h1 className="text-3xl font-bold text-green-400 mb-8 text-center">
            Your Saved Passwords
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPasswords.length > 0 ? (
              userPasswords.map((p, index) => (
                <motion.div
                  key={p._id}
                  className="bg-gray-900 border border-green-500 rounded-xl p-5 shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm transition-all"
                    title="Delete password"
                  >
                    🗑️
                  </button>

                  <h2 className="text-lg font-bold text-green-300 mb-1">
                    {p.siteName || "Unknown Site"}
                  </h2>

                  <div className="text-sm text-gray-300 flex flex-wrap items-center gap-2">
                    {p.siteUrl ? (
                      <>
                        <a
                          href={p.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-400 hover:text-blue-300 break-all"
                        >
                          {p.siteUrl}
                        </a>
                        <button
                          onClick={() => handleCopy(p.siteUrl)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
                        >
                          Copy URL
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">URL: N/A</span>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="font-mono text-green-400 break-words">
                      Password: {p.password}
                    </p>
                    <button
                      onClick={() => handleCopy(p.password)}
                      className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-2 py-1 rounded transition"
                    >
                      Copy Password
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No passwords saved yet.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ShowPassword;
