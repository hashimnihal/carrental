import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const Navlinks = [
  { id: 1, name: "HOME", link: "/#home" },
  { id: 2, name: "ABOUT", link: "/about" },
 {
    id: 3,
    name: "CARS",
    dropdown: true,
    sublinks: [
      { name: "Rental Cars", link: "/#cars" },
      { name: "Used Premium Cars", link: "/usedpremiumcars" },
    ],
  },
  { id: 4, name: "GALLERY", link: "/#gallery" },
  { id: 5, name: "CONTACT US", link: "/#contactus" },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleNavigation = (event, link) => {
    event.preventDefault();
     
    if (link === "/") {
      // Force reload when clicking "HOME"
      window.location.href = "/";
      return;
    }

    if (link.startsWith("/#")) {
      // Scroll to in-page section
      const sectionId = link.replace("/#", "#");
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = link;
      }
    } else {
      // Navigate to a new page
      navigate(link);
    }

    setShowMenu(false); // Close mobile menu after clicking
    setDropdownOpen(null); // Close dropdown if open
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-black dark:text-white duration-300">
      <div className="bg-white dark:bg-gray-800 py-2 px-4 text-sm text-gray-800 dark:text-gray-300 flex justify-between items-center">
        <div>
          📞 <a href="tel:+91 9740038073" className="hover:text-blue-500">+91 9740038073</a> &nbsp; | &nbsp;
          ✉️ <a href="mailto:smartcars@gmail.com" className="hover:text-blue-500">smartcars@gmail.com</a>
        </div>
      </div>

      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-3xl font-bold font-serif">
              SMART CARS
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link, dropdown, sublinks }) => (
                <li key={id} className="relative group">
                  {dropdown ? (
                    <div
                      className="cursor-pointer text-lg font-medium hover:text-primary py-2 transition-colors duration-500"
                      onMouseEnter={() => setDropdownOpen(id)}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      {name}
                      <ul
                        className={`absolute left-0 top-full mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-md w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${
                          dropdownOpen === id ? "opacity-100 visible" : ""
                        }`}
                      >
                        {sublinks.map(({ name, link }) => (
                          <li key={name}>
                            <Link
                              to={link}
                              onClick={(event) => handleNavigation(event, link)}
                              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={link}
                      onClick={(event) => handleNavigation(event, link)}
                      className="text-lg font-medium hover:text-primary py-2 transition-colors duration-500"
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}

              {theme === "dark" ? (
                <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
              ) : (
                <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
              )}
            </ul>
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl cursor-pointer" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl cursor-pointer" />
            )}

            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMenu && (
        <div className="md:hidden bg-white dark:bg-black shadow-md absolute top-14 left-0 w-full transition-all">
          <ul className="flex flex-col items-center gap-4 py-4">
            {Navlinks.map(({ id, name, link, dropdown, sublinks }) => (
              <li key={id} className="w-full text-center">
                {dropdown ? (
                  <div
                    onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}
                    className="cursor-pointer text-lg font-medium hover:text-primary py-2 transition-colors duration-500"
                  >
                    {name}
                    {dropdownOpen === id && (
                      <ul className="mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-md w-full text-center">
                        {sublinks.map(({ name, link }) => (
                          <li key={name}>
                            <Link
                              to={link}
                              onClick={(event) => handleNavigation(event, link)}
                              className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link}
                    onClick={(event) => handleNavigation(event, link)}
                    className="text-lg font-medium hover:text-primary py-2 transition-colors duration-500 block"
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
