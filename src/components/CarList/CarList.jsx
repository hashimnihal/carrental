import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGasPump,
  FaSnowflake,
  FaCar,
  FaCogs,
  FaChair,
  FaSun,
  FaRoad,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";
import a1 from "../../assets/a1.jpeg";
import a2 from "../../assets/a2.jpeg";
import a3 from "../../assets/a3.jpeg";
import a4 from "../../assets/a4.jpeg";
import b1 from "../../assets/b1.jpeg";
import b2 from "../../assets/b2.jpeg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpeg";
import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.jpg";
import c3 from "../../assets/c3.jpeg";
import c4 from "../../assets/c4.jpeg";
import c5 from "../../assets/c5.jpeg";
import c6 from "../../assets/c6.png";
import d1 from "../../assets/d1.jpeg";
import d2 from "../../assets/d2.jpg";
import d3 from "../../assets/d3.jpeg";
import d4 from "../../assets/d4.jpeg";

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
    fuelType: "Petrol",
    color: "White",
    moreImages: [whiteCar,c1,c2,c3,c4,c5,c6],
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
    fuelType: "Diesel",
    color: "White",
    moreImages: [car2,b1,b2,b3,b4],
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
    fuelType: "Diesel",
    color: "Black",
    moreImages: [car3,a1,a2,a3,a4],
  },
  {
    name: "Maruti Swift",
    price: 1000,
    image: d2,
    model: "Top Model",
    fuel: "Petrol",
    ac: "Yes",
    mileage: "18 km/l",
    transmission: "Automatic",
    condition: "Very Good",
    seats: 5,
    sunroof: "No",
    fuelType: "Petrol",
    color: "Red",
    moreImages: [d2,d3,d4,d1],
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const [currentImageIndexes, setCurrentImageIndexes] = useState({}); // Track indexes for each car
  const navigate = useNavigate();

  const nextImage = (carName, moreImages) => {
    setCurrentImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carName]: (prevIndexes[carName] || 0) + 1 >= moreImages.length
        ? 0
        : (prevIndexes[carName] || 0) + 1,
    }));
  };

  const prevImage = (carName, moreImages) => {
    setCurrentImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [carName]: (prevIndexes[carName] || 0) - 1 < 0
        ? moreImages.length - 1
        : (prevIndexes[carName] || 0) - 1,
    }));
  };

  return (
    <div className="pb-24 container">
      <span id="cars"></span>
      <h2 className="text-3xl sm:text-4xl font-semibold font-serif mb-3 text-center">Cars Available</h2>
      <p className="text-sm pb-5 text-center">Rent Our Cars, Explore The World.</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a car..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Max Price (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="EV">Electric</option>
        </select>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Colors</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
        </select>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
        {carList
          .filter(
            (car) =>
              car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              (maxPrice === "" || car.price <= Number(maxPrice)) &&
              (fuelType === "" || car.fuelType === fuelType) &&
              (color === "" || car.color === color)
          )
          .map((car) => (
            <div
              key={car.name}
              className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl"
            >
              <div className="relative">
                <img
                  src={car.moreImages.length > 0
                    ? car.moreImages[currentImageIndexes[car.name] || 0]
                    : car.image}
                  alt={car.name}
                  className="w-full h-[120px] object-contain"
                  onClick={() =>
                    setFullScreenImage(
                      car.moreImages.length > 0
                        ? car.moreImages[currentImageIndexes[car.name] || 0]
                        : car.image
                    )
                  }
                />
                {car.moreImages.length > 0 && (
                  <>
                    <button
                      onClick={() => prevImage(car.name, car.moreImages)}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() => nextImage(car.name, car.moreImages)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              <h1 className="text-primary font-semibold">{car.name}</h1>
              <div className="flex justify-between items-center text-xl font-semibold">
                <p>₹{car.price}/Day</p>
                <button
                  onClick={() => setExpandedCar(expandedCar === car.name ? null : car.name)}
                  className="text-blue-600 underline"
                >
                  {expandedCar === car.name ? "Hide Details" : "Details"}
                </button>
              </div>

              {/* DetailsSection */}
              {expandedCar === car.name && (
                <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-3">
                    <p><FaCar /> Model: {car.model}</p>
                    <p><FaGasPump /> Fuel: {car.fuel}</p>
                    <p><FaSnowflake /> AC: {car.ac}</p>
                    <p><FaRoad /> Mileage: {car.mileage}</p>
                    <p><FaCogs /> Transmission: {car.transmission}</p>
                    <p><FaCogs /> Condition: {car.condition}</p>
                    <p><FaChair /> Seats: {car.seats}</p>
                    <p><FaSun /> Sunroof: {car.sunroof}</p>
                  </div>
                </div>
              )}

              {/* Rent Now Button */}
              <button
                onClick={() => navigate("/booking", { state: { car } })}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Rent Now
              </button>
            </div>
          ))}
      </div>

      {/* Full-Screen Image Modal */}
      {fullScreenImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={fullScreenImage}
              alt="Full Screen"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setFullScreenImage(null)}
              className="absolute top-3 right-3 bg-white text-black p-2 rounded-full shadow-lg text-xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList; 