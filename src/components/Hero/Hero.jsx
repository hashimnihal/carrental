import React, { useEffect, useState, useRef } from "react";
import carPng from "../../assets/car.png";
import yellowCar from "../../assets/banner-car.png";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

const Hero = ({ theme }) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const heroRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    AOS.refresh();
    const navbarHeight = navbarRef.current?.offsetHeight || 60;
    if (heroRef.current) {
      heroRef.current.style.paddingTop = `${navbarHeight}px`;
    }
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div ref={heroRef} className="dark:bg-black dark:text-white duration-300">
      <span id="home"></span>
      <div className="container min-h-[100vh] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          {/* Car Image */}
          <div
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-once="false"
            className="order-1 sm:order-2 w-full sm:w-auto"
          >
            <img
              src={theme === "dark" ? carPng : yellowCar}
              alt=""
              className="sm:scale-125 relative -z-10 max-h-[300px] sm:max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)] transform -translate-y-12 mx-auto"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 text-center sm:text-left">
            <h1
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
              className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-serif"
            >
              SMART CARS
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="400"
              className="leading-relaxed text-lg"
            >
              Welcome to SMART CARS, where your journey begins with unparalleled elegance and
              unwavering reliability. We're not just a car rental service; we're your partners in
              creating unforgettable experiences. Whether you're navigating the bustling city
              streets or embarking on a scenic road trip, our diverse fleet of meticulously
              maintained vehicles is ready to elevate your travel.
            </p>
            {showMore && (
              <>
                <p
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="600"
                  className="leading-relaxed text-lg"
                >
                  From the sleek sophistication of our luxury sedans to the robust versatility of our
                  SUVs, each vehicle in our collection is a testament to our commitment to quality and
                  comfort. We understand that your journey is more than just a destination; it's about
                  the moments you create along the way. That's why we strive to provide a seamless and
                  enjoyable rental experience, ensuring that every mile is a pleasure.
                </p>
                <p
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay="800"
                  className="leading-relaxed text-lg"
                >
                  At SMART CARS, we believe in going beyond the ordinary. Our dedicated team is
                  committed to providing personalized service, tailored to meet your unique needs. We
                  offer flexible rental options, transparent pricing, and a hassle-free booking
                  process, allowing you to focus on what truly matters – your journey. Discover the
                  difference with SMART CARS and experience the art of exceptional travel.
                </p>
              </>
            )}

            {/* Read More Button */}
            <div className="mt-4 flex justify-center sm:justify-start">
              <button
                onClick={toggleShowMore}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                {showMore ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Move Button Below */}
            <div className="mt-8 sm:mt-8 flex justify-center sm:justify-start w-full">
              <button
                onClick={() => navigate("/usedpremiumcars")}
                className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 
                text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-all 
                border border-blue-950 hover:border-blue-800 w-full sm:w-auto"
              >
                Browse Premium Used Cars 🚗
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;