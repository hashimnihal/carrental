import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import car1 from "../../assets/smart1.jpg";
import car2 from "../../assets/smart2.jpg";
import car3 from "../../assets/smart4.jpg";
import car4 from "../../assets/smart6.jpg";
import car5 from "../../assets/smart3.jpg"; 
import car6 from "../../assets/smart5.jpg"; 
import car7 from "../../assets/smart7.jpg"; 
import car8 from "../../assets/smart8.jpg"; 

const images = [car1, car2, car3, car4, car5, car6, car7, car8];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <span id="gallery"></span>
      <div className="py-20 px-4 md:px-16">

         <h2 className="text-3xl font-bold text-center mb-6">We Provide Best Used Cars with Warranty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => { setIndex(i); setOpen(true); }}
            >
              <img
                src={src}
                alt={`Car ${i + 1}`}
                className="w-full h-60 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.map(src => ({ src }))}
          index={index}
          setIndex={setIndex}
        />
      )}
    </>
  );
};

export default Gallery;

