import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import cr1 from "../../assets/3.jpeg";
import cr2 from "../../assets/2.jpeg";
import Footer from "../Footer/Footer";

const CarDetails = () => {
  const location = useLocation();
  const car = location.state?.car || {};
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Ensure images array is valid and set it
    if (car.images && car.images.length > 0) {
      setImages(car.images);
    } else if (car.image) {
      setImages([car.image, cr1, cr2]);
    } else {
      setImages([cr1, cr2]); // Default images if none are provided
    }
  }, [car]); // Re-run effect when car object changes

  if (!car.name) {
    return (
      <p className="text-center text-lg mt-20 text-red-600">
        ❌ No car details found.
      </p>
    );
  }

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white pt-16 px-4 sm:px-8">
      <div className="flex justify-center">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden p-6">
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
            <img
              src={images[currentImage]}
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-500"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-500 transition"
                >
                  <FaArrowLeft className="text-white text-lg sm:text-xl" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 sm:p-3 rounded-full shadow-md hover:bg-gray-500 transition"
                >
                  <FaArrowRight className="text-white text-lg sm:text-xl" />
                </button>
              </>
            )}
            <button
              onClick={openModal}
              className="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition z-50"
            >
              🔍
            </button>
          </div>

          <div className="text-center mt-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
              {car.name}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400 mt-1">
              ₹{car.price.toLocaleString()} 
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
            {[
              { label: "📅 Year", value: car.year },
              { label: "🛣 Mileage", value: `${car.mileage} km` },
              { label: "⛽ Fuel Type", value: car.fuel },
              { label: "⚙ Transmission", value: car.transmission },
              { label: "📍 Location", value: car.location },
              { label: "🚗 Owner", value: car.owner },
              { label: "🔧 Engine", value: car.engine },
              { label: "🪑 Seating", value: `${car.seating} ` },
              { label: "🎨 Color", value: car.color },
              { label: "❄ AC Available", value: car.ac ? "Yes" : "No" },
            ].map((detail, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
              >
                <span className="font-semibold mr-2">{detail.label}:</span>
                <span className="text-gray-700 dark:text-gray-300">{detail.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/usedbook", { state: { car } })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaTimes className="text-xl text-black dark:text-white" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 bg-gray-800 p-4 rounded-full shadow-md hover:bg-gray-600 transition"
          >
            <FaArrowLeft className="text-white text-2xl" />
          </button>

          <img
            src={images[currentImage]}
            alt="Fullscreen Car"
            className="max-w-full max-h-full object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-6 bg-gray-800 p-4 rounded-full shadow-md hover:bg-gray-600 transition"
          >
            <FaArrowRight className="text-white text-2xl" />
          </button>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CarDetails;