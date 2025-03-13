import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Slider } from "@mui/material";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";

const usedPremiumCars = [
  {
    id: 1,
    name: "Mercedes-Benz C-Class",
    price: 3500000,
    year: "2020",
    mileage: "25,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Bangalore",
    owner: "1st Owner",
    engine: "2.0L Turbo",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Black",
    brand: "Mercedes-Benz",
    model: "C-Class",
    image: car2,
  },
  {
    id: 2,
    name: "BMW 5 Series",
    price: 4500000,
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "BMW",
    model: "5 Series",
    image: car3,
  }, {
    id: 2,
    name: "BMW 5 Series",
    price: 4500000,
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "BMW",
    model: "5 Series",
    image: car3,
  }, {
    id: 2,
    name: "BMW 5 Series",
    price: 4500000,
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "BMW",
    model: "5 Series",
    image: car3,
  }, {
    id: 2,
    name: "BMW 5 Series",
    price: 4500000,
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "BMW",
    model: "5 Series",
    image: car3,
  }, {
    id: 2,
    name: "BMW 5 Series",
    price: 4500000,
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "BMW",
    model: "5 Series",
    image: car3,
  }
];

const filterOptions = {
  brand: ["Mercedes-Benz", "BMW", "Audi", "Lexus", "Jaguar"],
  model: ["C-Class", "5 Series", "A6", "RX", "XF"],
  year: ["2023", "2022", "2021", "2020", "2019"],
  seating: ["2", "4", "5", "7"],
  bodyType: ["Sedan", "SUV", "Coupe", "Hatchback"],
  owner: ["1st Owner", "2nd Owner", "3rd Owner"],
  fuel: ["Petrol", "Diesel", "Electric", "Hybrid"],
  transmission: ["Manual", "Automatic"],
  color: ["Black", "White", "Blue", "Red", "Silver"],
};

const UsedPremiumCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceRange, setPriceRange] = useState([3000000, 5000000]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCars(usedPremiumCars);
    setFilteredCars(usedPremiumCars);
  }, []);

  const applyFilters = () => {
    let filtered = cars.filter(
      (car) =>
        car.price >= priceRange[0] &&
        car.price <= priceRange[1] &&
        Object.keys(filters).every((key) => (filters[key] ? car[key] === filters[key] : true))
    );
    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-6 pt-24">
      <h1 className="text-4xl font-bold text-center mb-6 uppercase">Premium Used Cars</h1>
      <div className="flex flex-col md:flex-row">
        <button
          className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <div className={`md:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ${showFilters ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>
          <label className="block font-semibold">Price Range:</label>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={1000000}
            max={10000000}
          />
          {Object.keys(filterOptions).map((filter) => (
            <select
              key={filter}
              className="w-full p-2 border rounded mt-4"
              onChange={(e) => setFilters({ ...filters, [filter]: e.target.value })}
            >
              <option value="">{filter.charAt(0).toUpperCase() + filter.slice(1)}</option>
              {filterOptions[filter].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ))}
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{car.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{car.year} • {car.mileage} • {car.fuel} • {car.transmission}</p>
                <p className="text-gray-500 dark:text-gray-300">📍 {car.location}</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{car.price.toLocaleString()}</p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                  onClick={() => navigate(`/usedpremiumcars/${car.id}`, { state: { car } })}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsedPremiumCars;