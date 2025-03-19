import React from "react";
import CarPng from "../../assets/car1.png";
import Bmw from "../../assets/bmw.png";
import Audi from "../../assets/audi.png";
import Mercedes from "../../assets/mercedes.png";
import suzuki from "../../assets/suzuki.png";
import toyota from "../../assets/toyota.png";
import mahindra from "../../assets/mahindra.png";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-dark bg-slate-100 sm:min-h-[650px] flex items-center justify-center duration-300 pb-10 pt-[80px] sm:pt-[100px]">
        {/* Adjusted pt-[80px] to prevent content overlap with sticky navbar */}
        <div className="container px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            {/* Left Image Section */}
            <div
              data-aos="slide-right"
              data-aos-duration="1500"
              className="flex justify-center"
            >
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
                <img
                  src={CarPng}
                  alt="Car"
                  className="object-contain w-full h-auto drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
                />
              </div>
            </div>

            {/* Right Text Section */}
            <div className="text-center sm:text-left space-y-5 sm:p-10 px-2">
              <h1
                data-aos="fade-up"
                className="text-2xl sm:text-4xl font-bold font-serif"
              >
                About Us
              </h1>
              <p
                data-aos="fade-up"
                className="leading-7 sm:leading-8 tracking-wide text-sm sm:text-base"
              >
                Welcome to <b>SMART CARS</b>, your trusted partner for reliable
                and affordable car rental services. Whether you're planning a
                weekend getaway, a business trip, or just need a ride for your
                daily errands, we've got you covered.
              </p>
              <p data-aos="fade-up" className="text-sm sm:text-base">
                With a diverse fleet of well-maintained vehicles, ranging from
                compact cars to luxury sedans and spacious SUVs, we cater to all
                your travel needs. Our mission is to make your journey smooth,
                convenient, and stress-free.
              </p>
            </div>
          </div>

          {/* Car Brands Section */}
          <div className="bg-slate-100 py-6 mt-8">
  <div className="container flex justify-between items-center flex-wrap gap-6">
    <img src={Mercedes} alt="Mercedes" className="h-20 sm:h-16 w-auto transition" />
    <img src={Bmw} alt="BMW" className="h-20 sm:h-16 w-auto transition" />
    <img src={Audi} alt="Audi" className="h-20 sm:h-16 w-auto transition" />
    <img src={mahindra} alt="Mahindra" className="h-20 sm:h-16 w-auto transition" />
    <img src={suzuki} alt="Maruthi suzuki" className="h-20 sm:h-16 w-auto transition" />
    <img src={toyota} alt="Toyota" className="h-20 sm:h-16 w-auto transition" />
  </div>
</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
