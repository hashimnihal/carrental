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
    description: "Luxury SUV with premium interiors and off-road capability.",
    fuelType: "Petrol",
    color: "White",
  },
  {
    name: "SCORPIO WHITE",
    price: 1500,
    image: car2,
    description: "Powerful SUV with a robust design, great for long trips.",
    fuelType: "Diesel",
    color: "White",
  },
  {
    name: "SCORPIO BLACK",
    price: 1200,
    image: car3,
    description: "Stylish black edition with high-performance features.",
    fuelType: "Diesel",
    color: "Black",
  },
];

const CarList = () => {
  const [expandedCar, setExpandedCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(""); // State for max price filter
  const [fuelType, setFuelType] = useState(""); // State for fuel type filter
  const [color, setColor] = useState(""); // State for color filter
  const navigate = useNavigate();

  const toggleDetails = (carName) => {
    setExpandedCar(expandedCar === carName ? null : carName);
  };

  // Filter cars based on search, price, fuel type, and color
  const filteredCars = carList.filter((car) => {
    return (
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (maxPrice === "" || car.price <= Number(maxPrice)) &&
      (fuelType === "" || car.fuelType === fuelType) &&
      (color === "" || car.color === color)
    );
  });

  return (
    <div className="pb-24">
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Cars Available
        </h1>
        <p className="text-sm pb-5">Rent Our Cars, Explore The World.</p>

        {/* Search, Price, Fuel Type & Color Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a car..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Price Filter */}
          <input
            type="number"
            placeholder="Max Price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Fuel Type Filter */}
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Fuel Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
          </select>

          {/* Color Filter */}
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

        {/* Car List */}
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

                {expandedCar === data.name && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-lg transition-all duration-500">
                    <p className="text-gray-700">{data.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      More specifications will be added soon.
                    </p>
                  </div>
                )}

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
  );
};

export default CarList;
