import React, { useEffect } from "react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

const Hero = ({ theme }) => {
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="dark:bg-black dark:text-white duration-300">
      <span id="home"></span>
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* Car Image */}
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32">
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              SMART CARS
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Welcome to SMART CARS, your trusted partner for reliable, affordable car rentals. 
              From compact cars to luxury SUVs, we offer a diverse fleet and seamless service to 
              make your journey hassle-free.
            </p>

            {/* Move Button Below */}
            <div className="mt-8">
            <button
  data-aos="fade-up"
  data-aos-delay="1500"
  onClick={() => navigate("/usedpremiumcars")}
  className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 
  text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-all 
  border border-blue-950 hover:border-blue-800"
>
  Browse Premium Cars 🚗
</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

