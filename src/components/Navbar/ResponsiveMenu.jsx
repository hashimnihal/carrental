import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, toggleMenu }) => {
  return (
    <div className="fixed inset-0 z-30">
      {/* Background Overlay - Click to Close Menu */}
      {showMenu && (
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>
      )}

      {/* Sliding Menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: showMenu ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-r-2xl px-6 py-8 flex flex-col justify-between"
      >
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <FaUserCircle size={50} className="text-gray-600 dark:text-gray-400" />
          <div>
            <h1 className="text-lg font-semibold">Hello User</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Premium user</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">
          <ul className="space-y-4 text-lg font-medium">
            {Navlinks.map((data, index) => (
              <li key={index}>
                <a
                  href={data.link}
                  className="block px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={toggleMenu} // Close menu on click
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-4">
          <h1 className="text-center">&copy; 2025 Made by Hafeez, Raif, Hashim, Shahin</h1>
        </div>
      </motion.div>
    </div>
  );
};

export default ResponsiveMenu;
