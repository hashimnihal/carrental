import { title } from "framer-motion/client";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaMobileAlt,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export const FooterLinks = [
  {
    id: 1,
    title: "Home",
    link: "/#",
  },
  {
    id: 2,
    title: "About",
    link: "/#about",
  },
  {
    id: 3,
    title: "Cars",
    link: "/#cars",
  },
  {
    id: 4,
    title: "Gallery",
    link: "/#gallery",
  },
  {
    id: 5,
    title: "Terms & Conditions",
    link: "/terms-and-conditions"
  }

];

const Footer = () => {
  return (
    <>
      <span id="contactus"></span>
      <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
        <section className="container">
          <div className="grid md:grid-cols-3 py-8 px-6">
            {/* 🚗 Company Details */}
            <div className="py-6">
              <h1 className="text-2xl font-bold mb-3 flex items-center gap-3 font-serif">
                Car Rental
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Affordable and reliable car rentals for every journey. Choose from a wide range of vehicles and enjoy seamless booking with us!
              </p>


<div className="mt-4 space-y-2">
  {/* Clickable Address - Opens Google Maps */}
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
    <FaLocationArrow />
    <a
      href="https://www.google.com/maps/search/?api=1&query=Arasa+Complex,+Gurumandira+Sajipa+Mooda,+smartcars+melkar"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 transition-colors"
    >
      Arasa Complex, Gurumandira Sajipa Mooda, Bantwal DK
    </a>
  </div>

  {/* Clickable Phone Number - Opens Dialer */}
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
    <FaMobileAlt />
    <a
      href="tel:+919740038073"
      className="hover:text-blue-500 transition-colors"
    >
      +91 9740038073
    </a>
  </div>

  {/* Clickable Email - Opens Email Client */}
  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
    <FaEnvelope />
    <a
      href="mailto:smartcars@gmail.com"
      className="hover:text-blue-500 transition-colors"
    >
      smartcars@gmail.com
    </a>
  </div>
</div>


              {/* 🌐 Social Media Links */}
              <div className="flex items-center gap-4 mt-6 text-gray-600 dark:text-gray-300">
                <a
                  href="https://www.instagram.com/smartcarsmelkar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-3xl hover:text-pink-500 transition duration-300" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100064784505368"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-3xl hover:text-blue-600 transition duration-300" />
                </a>
                <a
                  href="https://wa.me/919482549071"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-3xl hover:text-green-500 transition duration-300" />
                </a>
              </div>
            </div>

            {/* 🔗 Footer Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
              <div className="py-6">
                <h1 className="text-lg font-bold mb-3">Important Links</h1>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  {FooterLinks.map((link) => (
                    <li key={link.id} className="cursor-pointer hover:text-primary duration-300">
                      <span>➜</span> <a href={link.link}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 📍 Location Map */}
              <div className="py-6">
                <h1 className="text-lg font-bold mb-3">Location</h1>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8188925582044!2d75.01860157401293!3d12.854971217426703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4a78bcdd1b9ed%3A0xfa2cee9838419825!2sSmart%20Cars!5e0!3m2!1skn!2sin!4v1738053692114!5m2!1skn!2sin"
                  className="w-full h-40 rounded-lg shadow-md"
                  loading="lazy"
                  title="Car Rental Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* 📜 Copyright Section */}
        <div className="bg-gray-900 text-white text-center py-3 text-sm">
          &copy; {new Date().getFullYear()} Karnataka (Govt.) Polytechnic, Mangalore. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
