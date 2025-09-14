import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black text-white border-t border-green-500 px-6 py-10 md:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                {/* Logo/Branding */}
                <div>
                    <h2 className="text-2xl font-bold text-green-400">
                        &lt; Nitesh <span className="text-red-400">Password</span> Manager / &gt;
                    </h2>
                    <p className="text-sm text-gray-400 mt-2">Secure your digital life, effortlessly.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <Link to="/" className="hover:text-green-400 transition">Home</Link>
                    <Link to="/user/register" className="hover:text-green-400 transition">Register</Link>
                    <Link to="/user/login" className="hover:text-green-400 transition">Login</Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center text-gray-500 text-xs mt-8 border-t border-green-500 pt-4">
                &copy; {new Date().getFullYear()} Nitesh Password Manager. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
