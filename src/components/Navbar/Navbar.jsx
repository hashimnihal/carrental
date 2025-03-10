import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "/#about",
  },
 
  {
    id: 1,
    name: "CARS",
    link: "/#cars",
  },
  { id: 3, name: "GALLERY", link: "/#gallery" }, 
  {
    id: 1,
    name: "CONTACTUS",
    link: "/#contactus",
  },
];
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-black dark:text-white duration-300">
    {/* Top Contact Bar */}
    <div className="bg-White -200 dark:bg-gray-800 py-2 px-4 text-sm text-gray-800 dark:text-gray-300 flex justify-between items-center">
      <div>
        📞 <a href="tel:+91 9740038073" className="hover:text-blue-500">+91 9740038073</a> &nbsp; | &nbsp;
        ✉️ <a href="mailto:smartcars@gmail.com" className="hover:text-blue-500">smartcars@gmail.com</a>
      </div>
      </div>
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">SMART CARS</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500  "
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* DarkMode feature implement */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
    
  <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu} />

      
    </div>
  );
};

export default Navbar;



