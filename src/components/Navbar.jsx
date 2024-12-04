import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Brand */}
        <div className="text-xl font-bold">
          <Link to="/" onClick={closeMenu}>
            MyApp
          </Link>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-6 absolute md:static bg-gray-800 w-full md:w-auto top-16 md:top-0 left-0 p-4 md:p-0`}
        >
          {/* User-specific Links */}
          {currentUser?.role === "user" && (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/user-orders"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  Cart
                </Link>
              </li>
            </>
          )}

          {/* Admin-specific Links */}
          {currentUser?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/admin-dashboard"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/all-orders"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  All Orders
                </Link>
              </li>
            </>
          )}

          {/* Authentication Links */}
          {currentUser ? (
            <li>
              <button
                onClick={() => {
                  logout(); // Log the user out
                  closeMenu(); // Close the menu
                }}
                className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-yellow-400 transition-colors"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
