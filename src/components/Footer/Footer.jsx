import React from "react";
import Navbar from "../Navbar/Navbar";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  {
    id:1,
    title: "Home",
    link: "/#",
  },
  {
    id:1,
    title: "About",
    link: "/#about",
  },
  {
    id:1,
    title: "Contact",
    link: "/#contact",
  },
  {
    id:1,
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <>
      <span id="contactus"></span>
      <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
        <section className="container">
          <div className="grid md:grid-cols-3 py-5">
            {/* Company Details */}
            <div className="py-8 px-4">
              <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3 font-serif">
                Car Rental
              </h1>
              <p className="text-sm">
                Affordable and reliable car rentals for every journey. Choose from a wide range of vehicles and enjoy seamless booking with us!
              </p>
              <br />
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Arasa Complex,gurumandira Sajipa mooda ,Bantwal DK</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p>+91 9740038073</p>
              </div>
              {/* Social Media Links */}
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.instagram.com/smartcarsmelkar">
                  <FaInstagram className="text-3xl hover:text-primary duration-300" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100064784505368">
                  <FaFacebook className="text-3xl hover:text-primary duration-300" />
                </a>
                
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-500 dark:text-gray-200"
                    >
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Location
                </h1>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8188925582044!2d75.01860157401293!3d12.854971217426703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a78bcdd1b9ed%3A0xfa2cee9838419825!2sSmart%20Cars!5e0!3m2!1skn!2sin!4v1738053692114!5m2!1skn!2sin"
                  className="w-full h-40 rounded-lg"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <div className="bg-gray-900 text-white text-center py-3 text-sm">
          &copy; {new Date().getFullYear()} Karnataka (Govt.) Polytechnic, Mangalore. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
