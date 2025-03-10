import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaSnowflake, FaCar, FaCogs, FaChair, FaSun, FaRoad, FaCog } from "react-icons/fa";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import smart1 from "../../assets/smart1.jpg";
import smart2 from "../../assets/smart2.jpg";
import { span } from "framer-motion/client";

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
    moreImages: [smart1, smart2],
    description: "Luxury SUV with premium interiors and off-road capability.",
    fuelType: "Petrol",
    color: "White",
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
    moreImages: [],
    description: "Powerful SUV with a robust design, great for long trips.",
    fuelType: "Diesel",
    color: "White",
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
    moreImages: [],
    description: "Stylish black edition with high-performance features.",
    fuelType: "Diesel",
    color: "Black",
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const [showGallery, setShowGallery] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const toggleDetails = (carName) => {
    setExpandedCar(expandedCar === carName ? null : carName);
  };

  const filteredCars = carList.filter((car) => {
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (maxPrice === "" || car.price <= Number(maxPrice)) &&
      (fuelType === "" || car.fuelType === fuelType) &&
      (color === "" || car.color === color)
    );
  });

  return (<>
    <span id="cars"></span>
    <div className="pb-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Cars Available
        </h1>
        <p className="text-sm pb-5">Rent Our Cars, Explore The World.</p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for a car..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Colors</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {filteredCars.length > 0 ? (
            filteredCars.map((data) => (
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
                <button
                  onClick={() => navigate("/booking", { state: { car: data } })}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Rent Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No cars found.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default CarList;
