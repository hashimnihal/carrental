import React from "react";
import Navbar from "../Navbar/Navbar";
import car1 from "../../assets/smart1.jpg";
import car2 from "../../assets/smart2.jpg";
import car3 from "../../assets/smart4.jpg";
import car4 from "../../assets/smart6.jpg";
import car5 from "../../assets/smart3.jpg";  // New Image
import car6 from "../../assets/smart5.jpg";  // New Image
import car7 from "../../assets/smart7.jpg";  // New Image
import car8 from "../../assets/smart8.jpg"; // New Image

const Gallery = () => {
  const images = [car1, car2, car3, car4, car5, car6, car7, car8]; // Now includes 8 images
<galler/>
  return (
    <>
      <span id="gallery"></span>
      <div className="pt-20 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-6">We Provide Best Used Cars with Warranty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md">
              <img
                src={src} // Use the correct image from the array
                alt={`Car ${index + 1}`}
                className="w-full h-60 object-cover transform hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
