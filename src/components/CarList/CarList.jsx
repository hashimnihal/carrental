import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";

const carList = [
  {
    name: "RANGE ROVER",
    price: 3000,
    image: whiteCar,
    aosDelay: "0",
    description: "Luxury SUV with premium interiors and off-road capability.",
  },
  {
    name: "SCORPIO WHITE",
    price: 1500,
    image: car2,
    aosDelay: "500",
    description: "Powerful SUV with a robust design, great for long trips.",
  },
  {
    name: "SCORPIO BLACK",
    price: 1200,
    image: car3,
    aosDelay: "1000",
    description: "Stylish black edition with high-performance features.",
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const navigate = useNavigate(); // For navigation

  // Function to toggle car details
  const toggleDetails = (carName) => {
    setExpandedCar(expandedCar === carName ? null : carName);
  };

  return (
    <>
      <div className="pb-24">
        <div className="container">
          <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
            Cars Available
          </h1>
          <p className="text-sm pb-10">Rent Our Cars, Explore The World.</p>

          {/* Car listing */}
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

                {/* Expandable Car Details */}
                {expandedCar === data.name && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-lg transition-all duration-500">
                    <p className="text-gray-700">{data.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      More specifications will be added soon.
                    </p>
                  </div>
                )}

                {/* Rent Now Button */}
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


