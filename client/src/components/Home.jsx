import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import AppContext from '../context/AppContext';

export const Home = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  const navigate = useNavigate();



  const handleLogin = () => {
    if (isAuth) {
      navigate('/user/dashboard');
    } else {
      navigate('/user/login');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-black text-white pt-16 pb-32">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TypeAnimation
          sequence={[
            'Nitesh Password Manager',
            2000,
            'Secure Your Digital Vault',
            2000,
            'Manage Passwords Effortlessly',
            2000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-green-400"
        />
      </motion.div>

      {/* Subheading */}
      <motion.h2
        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        The best password manager — free and secure.
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Create an account and start managing your passwords securely. We value your privacy and ensure your data is encrypted and protected.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {!isAuth && (<>
          <Link
            to="/user/register"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
          >
            Sign Up
          </Link>

          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
          >
            Login
          </button>
        </>)}

        <Link
          to="https://niteshkumar-sepia.vercel.app/"
          target='_blank'
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
        >
          Visit Portfolio
        </Link>
      </motion.div>
    </main>
  );
};
