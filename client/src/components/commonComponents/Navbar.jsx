import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { logout, isAuth } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
        if (isAuth) {
            navigate('/user/dashboard');
        } else {
            navigate('/user/login');
        }
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `cursor-pointer transition-all duration-200 hover:text-green-400 ${isActive(path) ? 'text-green-400 font-semibold' : 'text-white'}`;

    const buttonClass = `px-4 py-1 rounded-md transition hover:scale-105 hover:shadow-md`;

    return (
        <nav className="bg-black text-white border-b border-green-500 px-6 py-4 md:px-20 flex justify-between items-center relative z-50">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight text-green-400">
                <Link to="/">
                    &lt; Nitesh <span className="text-red-400">Password</span> Manager / &gt;
                </Link>
            </div>

            {/* Hamburger icon (mobile) */}
            <div className="md:hidden cursor-pointer">
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6 items-center text-lg">
                <li><Link className={linkClass('/')} to="/">Home</Link></li>
                {!isAuth && (
                    <>
                        <li><Link className={linkClass('/user/register')} to="/user/register">Register</Link></li>
                        <li>
                            <button
                                className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white cursor-pointer`}
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </li>
                    </>
                )}
                {isAuth && (
                    <>
                        <li><Link className={linkClass('/user/dashboard')} to="/user/dashboard">Dashboard</Link></li>
                        <li>
                            <button
                                className={`${buttonClass} bg-red-600 hover:bg-red-700 text-white cursor-pointer`}
                                onClick={() => {
                                    logout();
                                    navigate('/');
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>

            {/* Mobile Menu */}
            {open && (
                <ul className="absolute top-full left-0 w-full bg-black border-t border-green-500 flex flex-col items-center py-4 gap-4 md:hidden">
                    <li><Link onClick={() => setOpen(false)} className={linkClass('/')} to="/">Home</Link></li>
                    {!isAuth && (
                        <>
                            <li>
                                <Link onClick={() => setOpen(false)} className={linkClass('/user/register')} to="/user/register">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => { handleLogin(); setOpen(false); }}
                                    className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white cursor-pointer`}
                                >
                                    Login
                                </button>
                            </li>
                        </>
                    )}
                    {isAuth && (
                        <>
                            <li>
                                <Link onClick={() => setOpen(false)} className={linkClass('/user/dashboard')} to="/user/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => { logout(); setOpen(false); navigate('/') }}
                                    className={`${buttonClass} bg-red-600 hover:bg-red-700 text-white cursor-pointer`}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
