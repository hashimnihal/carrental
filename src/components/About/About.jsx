import React from "react";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <>

    <span id="about"></span>
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
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
      </div>
    </div>
    </>
  );
};

export default About;
