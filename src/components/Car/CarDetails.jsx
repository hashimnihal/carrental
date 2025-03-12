import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaExpand, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const CarDetails = () => {
  const location = useLocation();
  const car = location.state?.car || {};
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!car.name) {
    return <p className="text-center text-lg mt-20 text-red-600">❌ No car details found.</p>;
  }

  const images = car.images || [car.image];
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white pt-16 px-4 sm:px-8">
      {/* Back Button */}
           <button
             onClick={() => navigate(-1)}
             className="fixed top-9 left-5 bg-gray-100 dark:bg-gray-400 p-3 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition z-50"
           >
             <IoArrowBack className="text-1.5xl text-black dark:text-white" />
           </button>

      {/* Car Details Card */}
      <div className="flex justify-center">
        <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden p-6">
          {/* Image Section */}
          <div className="relative w-full h-80 sm:h-96 bg-gray-200 rounded-xl overflow-hidden">
            <img src={images[currentImage]} alt={car.name} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-500 transition"
                >
                  <FaArrowLeft className="text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-500 transition"
                >
                  <FaArrowRight className="text-white" />
                </button>
              </>
            )}
           <button
  onClick={openModal}
  className="absolute bottom-6 right-6 bg-white dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition z-50"
>
  <FaExpand className="text-black dark:text-white" />
</button>

          </div>

          {/* Car Details */}
          <div className="text-center mt-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{car.name}</h1>
            <p className="text-xl font-semibold text-green-600 dark:text-green-400 mt-1">₹{car.price} / Day</p>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm sm:text-base">
            {[
              { label: "📅 Year", value: car.year },
              { label: "🛣 Mileage", value: `${car.mileage} km` },
              { label: "⛽ Fuel Type", value: car.fuel },
              { label: "⚙ Transmission", value: car.transmission },
              { label: "📍 Location", value: car.location },
              { label: "🚗 Owner", value: car.owner },
              { label: "🔧 Engine", value: car.engine },
              { label: "🪑 Seating Capacity", value: car.seating },
              { label: "🎨 Color", value: car.color },
              { label: "❄ AC Available", value: car.ac ? "Yes" : "No" },
            ].map((detail, index) => (
              <p key={index} className="flex items-center">
                <span className="font-semibold mr-2">{detail.label}:</span> {detail.value}
              </p>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/usedbook", { state: { car } })}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-30">
         <button
  onClick={closeModal}
  className="absolute top-6 right-6 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg text-black hover:bg-gray-300 dark:hover:bg-gray-600 z-50"
>
  <FaTimes className="text-xxl" />
</button>

          <img src={images[currentImage]} alt="Fullscreen Car" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default CarDetails;
