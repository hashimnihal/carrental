import React from "react";
import CarPng from "../../assets/car1.png";
import Bmw from "../../assets/bmw.png"
import Audi from "../../assets/audi.png"
import Mercedes from "../../assets/mercedes.png"
import suzuki from "../../assets/suzuki.png"
import toyota from "../../assets/toyota.png"
import mahindra from "../../assets/mahindra.png"

const About = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-dark bg-slate-100 sm:min-h-[650px] sm:grid sm:place-items-center duration-300 pb-10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
            <div data-aos="slide-right" data-aos-duration="1500" className="text-center">
              <img
                src={CarPng}
                alt="Car"
                className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
              />
            </div>

            <div>
              <div className="space-y-5 sm:p-16 pb-6">
                <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-serif">
                  About us
                </h1>
                <p data-aos="fade-up" className="leading-8 tracking-wide">
                  Welcome to SMART CARS, your trusted partner for reliable and affordable car rental services. Whether you're planning a weekend getaway, a business trip, or simply need a ride for your daily errands, we've got you covered.
                </p>
                <p data-aos="fade-up">
                  With a diverse fleet of well-maintained vehicles, ranging from compact cars to luxury sedans and spacious SUVs, we cater to all your travel needs. Our mission is to make your journey smooth, convenient, and stress-free.
                </p>
              </div>
            </div>
          </div>

          {/* Updated Luxury Car Logos Section Inside Background */}
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
    </>
  );
};

export default About;


