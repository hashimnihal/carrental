import React from "react";
import pattern from "../../assets/website/pattern.jpeg";

const bannerImg = {
  backgroundImage: `url(${pattern})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const AppStoreBanner = () => {
  return (
    <div className="container">
      <div
        className="text-black py-10 sm:min-h-[400px] sm:grid sm:place-items-center rounded-xl"
        style={bannerImg}
      >
        <div>
          <div className="space-y-6 max-w-xl mx-auto">
            <h1
              data-aos="fade-up"
              className="text-2xl text-center sm:text-4xl font-semibold font-serif"
            >
              Unlock Your Next Adventure
            </h1>
            <p data-aos="fade-up" className="text-center sm:px-20">
              Where Every Road Leads to New Memories.
            </p>
            <div
              data-aos="zoom-in"
              className="flex flex-wrap justify-center items-center gap-4"
            >
              {/* Optional: Add a button or link here */}
              <a
                href="#cars" // Link to your car listing section
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Explore Cars Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppStoreBanner;