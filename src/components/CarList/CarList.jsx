import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGasPump, FaSnowflake, FaCar, FaCogs, FaChair, FaSun, FaRoad } from "react-icons/fa";
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
    moreImages: [smart1, smart2],
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
    fuelType: "Diesel",
    color: "Black",
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const [showGallery, setShowGallery] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const toggleDetails = (carName) => {
    setExpandedCar(expandedCar === carName ? null : carName);
    setShowGallery(null); // Reset gallery when toggling details
  };

  return (
    
    <div className="pb-24 container">
      <span id="cars"></span>
      <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">Cars Available</h1>
      <p className="text-sm pb-5">Rent Our Cars, Explore The World.</p>

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
            <div key={car.name} className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl">
              <img src={car.image} alt={car.name} className="w-full h-[120px] object-contain" />
              <h1 className="text-primary font-semibold">{car.name}</h1>
              <div className="flex justify-between items-center text-xl font-semibold">
                <p>₹{car.price}/Day</p>
                <button onClick={() => toggleDetails(car.name)} className="text-blue-600 underline">
                  {expandedCar === car.name ? "Hide Details" : "Details"}
                </button>
              </div>

              {/* Details Section */}
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

                  {/* More Images Button - Always Visible */}
                  <button
                    onClick={() => setShowGallery(showGallery === car.name ? null : car.name)}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {showGallery === car.name ? "Hide Images" : "More Images"}
                  </button>

                  {/* Image Gallery - Always Available */}
                  {showGallery === car.name && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {car.moreImages.length > 0 ? (
                        car.moreImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt="Car"
                            className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
                            onClick={() => setFullScreenImage(img)}
                          />
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No additional images available</p>
                      )}
                    </div>
                  )}
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
        <img src={fullScreenImage} alt="Full Screen" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl" />
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
