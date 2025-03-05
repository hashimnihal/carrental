import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaSnowflake, FaCar, FaCogs, FaChair, FaSun, FaRoad, FaCog } from "react-icons/fa";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import smart1 from "../../assets/smart1.jpg";
import smart2 from "../../assets/smart2.jpg";

const carList = [
  {
    name: "RANGE ROVER",
    price: 3000,
    image: whiteCar,
    model: "Top Model",
    fuel: "Diesel",
    ac: "Yes",
    mileage: "12 km/l",
    transmission: "Automatic",
    condition: "Excellent",
    seats: 5,
    sunroof: "Yes",
    moreImages: [smart1,smart2],
  },
  {
    name: "SCORPIO WHITE",
    price: 1500,
    image: car2,
    model: "Mid Model",
    fuel: "Diesel",
    ac: "Yes",
    mileage: "15 km/l",
    transmission: "Manual",
    condition: "Good",
    seats: 7,
    sunroof: "No",
    moreImages: ["../../assets/car2-side.png", "../../assets/car2-interior.png"],
  },
  {
    name: "SCORPIO BLACK",
    price: 1200,
    image: car3,
    model: "Base Model",
    fuel: "Petrol",
    ac: "Yes",
    mileage: "13 km/l",
    transmission: "Automatic",
    condition: "Very Good",
    seats: 7,
    sunroof: "Yes",
    moreImages: ["../../assets/car3-side.png", "../../assets/car3-interior.png"],
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const [showGallery, setShowGallery] = useState(null);
  const navigate = useNavigate();

  const toggleDetails = (carName) => {
    setExpandedCar(expandedCar === carName ? null : carName);
  };

  return (
    <>
    <span id="cars"></span>
    <div className="pb-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Cars Available
        </h1>
        <p className="text-sm pb-10">Rent Our Cars, Explore The World.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {carList.map((data) => (
            <div
              key={data.name}
              className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative"
            >
              <div className="w-full h-[120px]">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-[120px] object-contain"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-primary font-semibold">{data.name}</h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>₹{data.price}/Day</p>
                  <button
                    onClick={() => toggleDetails(data.name)}
                    className="text-blue-600 underline"
                  >
                    {expandedCar === data.name ? "Hide Details" : "Details"}
                  </button>
                </div>
              </div>

              {expandedCar === data.name && (
                <div className="mt-3 p-3 bg-white-100 rounded-lg transition-all duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <p><FaGasPump /> Fuel: {data.fuel}</p>
                    <p><FaSnowflake /> AC: {data.ac}</p>
                    <p><FaCar /> Model: {data.model}</p>
                    <p><FaCogs /> Condition: {data.condition}</p>
                    <p><FaChair /> Seats: {data.seats}</p>
                    <p><FaSun /> Sunroof: {data.sunroof}</p>
                    <p><FaRoad /> Mileage: {data.mileage}</p>
                    <p><FaCog /> Transmission: {data.transmission}</p>
                  </div>
                  <button
                    onClick={() => setShowGallery(data.name)}
                    className="mt-3 text-blue-600 underline block"
                  >
                    More Images
                  </button>
                </div>
              )}

              {showGallery === data.name && (
                <div className="mt-3 p-3 bg-gray-200 rounded-lg">
                  <h2 className="text-lg font-semibold">Car Images</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {data.moreImages.map((img, index) => (
                      <img key={index} src={img} alt="car" className="w-full h-24 object-cover rounded" />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowGallery(null)}
                    className="mt-2 text-red-500 underline block"
                  >
                    Close Gallery
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate("/booking", { state: { car: data } })}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CarList;
