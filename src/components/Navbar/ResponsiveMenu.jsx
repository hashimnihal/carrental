import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Navlinks } from "./Navbar";

const ResponsiveMenu = ({ showMenu, toggleMenu }) => {
  return (
    <div className={`fixed inset-0 z-50 ${showMenu ? "block" : "hidden"}`}>
      {/* Background Overlay - Click to Close */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={toggleMenu}
      ></div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-r-xl px-6 py-6 flex flex-col transition-transform duration-300 transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-2xl" onClick={toggleMenu}>
          <IoClose />
        </button>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 mt-4">
          <FaUserCircle size={50} className="text-gray-600 dark:text-gray-400" />
          <div>
            <h1 className="text-lg font-semibold">Hello User</h1>
            <h1 className="text-sm text-gray-500 dark:text-gray-400">
              Premium user
            </h1>
          </div>
        </div>

        {/* Navigation Links - Aligned from the Top */}
        <nav className="mt-6">
          <ul className="space-y-4 text-lg font-medium">
            {Navlinks.map((data, index) => (
              <li key={index}>
                <a
                  href={data.link}
                  className="block py-2 px-4 rounded-lg transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={toggleMenu} // Close menu on link click
                >
                  {data.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section - Always at the Bottom */}
        <div className="mt-auto text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-4">
          <h1 className="text-center">
            Made by Hafeez, Raif, Hashim, Shahin
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
