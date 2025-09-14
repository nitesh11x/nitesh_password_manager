import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, userPasswords, logout, isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/user/login");
  };

  return (
    <>
      {isAuth && (
        <section className="bg-black min-h-screen text-white px-4 md:px-10 lg:px-20 py-10">
          {/* Welcome Message */}
          <h1 className="text-3xl sm:text-4xl font-bold text-green-400 mb-8 animate-fade-in">
            Welcome, {user || "User"} 👋
          </h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Total Passwords",
                value: userPasswords?.length || 0,
                icon: "🔒",
              },
              {
                title: "Security Score",
                value: "100%",
                icon: "🛡️",
              },
              {
                title: "Last Login",
                value: "Just Now",
                icon: "⏰",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-xl border border-green-500 shadow-lg transform hover:scale-105 transition duration-300"
              >
                <h2 className="text-lg font-semibold text-green-300 mb-2 flex items-center gap-2">
                  {card.icon} {card.title}
                </h2>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button
              onClick={() => navigate("/user/password/add")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              ➕ Add New Password
            </button>
            <button
              onClick={() => navigate("/user/passwords")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              📄 View All Passwords
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              🚪 Logout
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Dashboard;
