import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import E1 from "../../assets/E1.jpeg";
import E2 from "../../assets/E2.jpeg";
import E3 from "../../assets/E3.jpeg";
import E4 from "../../assets/E4.jpeg";
import E5 from "../../assets/E5.jpeg";
import E6 from "../../assets/E6.jpeg";
import E7 from "../../assets/E7.jpeg";
import F1 from "../../assets/F1.jpeg";
import F2 from "../../assets/F2.jpeg";
import F3 from "../../assets/F3.jpeg";
import F4 from "../../assets/F4.jpeg";
import F5 from "../../assets/F5.jpeg";
import g1 from "../../assets/g1.avif";
import g2 from "../../assets/g2.jpg";
import xyz1 from "../../assets/Xyz1.avif";
import xyz2 from "../../assets/xyz2.webp";
import xyz3 from "../../assets/xyz3.webp";
import xyz4 from "../../assets/xyz4.webp";
import xyz from "../../assets/xyz.webp";
import G3 from "../../assets/g3.jpg";
import G4 from "../../assets/g4.jpg";

import H1 from "../../assets/H1.avif";
import H2 from "../../assets/H2.jpg";
import H3 from "../../assets/H3.jpg";
import H4 from "../../assets/H4.avif";
import H6 from "../../assets/H6.avif";
import H7 from "../../assets/H7.jpg";
import H8 from "../../assets/H8.avif";
import I1 from "../../assets/I1.jpg";
import I2 from "../../assets/I2.jpg";
import I3 from "../../assets/I3.webp";
import I4 from "../../assets/I4.jpg";
import I5 from "../../assets/I5.webp";
import Footer from "../Footer/Footer";

const usedPremiumCars = [
  {
    id: 1,
    name: "MG HECTOR",
    price: 350000,
    year: "2020",
    mileage: "25,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Mangalore",
    owner: "1st Owner",
    engine: "2.0L Turbo",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Maroon",
    brand: "MG",
    model: "C-Class",
    ac: "Yes",
    images: [E1,E2,E3,E4,E5,E6,E7],
  },
  {
    id: 2,
    name: "Swift Dzire",
    price: 450000,
    year: "2017",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Manual",
    location: "Mangalore",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Maroon",
    brand: "Maruti",
    model: "",
    images: [F1,F2,F3,F4,F5],
  },
  {
    id: 3,
    name: "Kia Seltos",
    price: 700000,
    year: "2021",
    mileage: "50,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mangalore",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Blue",
    brand: "KIA",
    model: "",
    ac: "Yes",
    images: [g1,g2,G3,G4],
  },
  {
    id: 4,
    name: "THAR",
    price: 1000000,
    year: "2022",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Manual",
    location: "Mangalore",
    owner: "1st Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Golden",
    brand: "Mahindra",
    model: "",
    ac: "Yes",
    images: [xyz,xyz2,xyz3,xyz4,xyz1],
  },
  {
    id: 5,
    name: "Jeep Compass",
    price: 800000,
    year: "2015",
    mileage: "80,000 km",
    fuel: "Diesel",
    transmission: "Manual",
    location: "Mangalore",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "Red",
    brand: "Jeep",
    model: "",
    ac :"Yes",
    images: [H1,H3,H2,H4,H6,H7,H8],
  },
  {
    id: 6,
    name: "Suzuki Alto 800",
    price: 150000,
    year: "2013",
    mileage: "90,000 km",
    fuel: "Petrol",
    transmission: "manual",
    location: "Mangalore",
    owner: "3rd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    bodyType: "Sedan",
    color: "White",
    brand: "Maruti",
    model: "",
    images: [I1,I4,I2,I3,I5],
  },
];

const filterOptions = {
  brand: ["MG", "KIA", "Mahindra", "Maruti", "Jeep"],
  year: ["2023", "2022", "2021", "2020", "2019"],
  seating: ["2", "4", "5", "7"],
  bodyType: ["Sedan", "SUV", "Coupe", "Hatchback"],
  owner: ["1st Owner", "2nd Owner", "3rd Owner"],
  fuel: ["Petrol", "Diesel", "Electric", "Hybrid"],
  transmission: ["Manual", "Automatic"],
  color: ["Black", "White", "Blue", "Red", "Silver","Maroon","Golden"],
};

const UsedPremiumCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [emiModalOpen, setEmiModalOpen] = useState(false);
  const [emiCar, setEmiCar] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(36);
  const [emiResult, setEmiResult] = useState(0);
  const [currentImageIndices, setCurrentImageIndices] = useState({});

  useEffect(() => {
    setCars(usedPremiumCars);
    setFilteredCars(usedPremiumCars);
    const initialIndices = {};
    usedPremiumCars.forEach((car) => {
      initialIndices[car.id] = 0;
    });
    setCurrentImageIndices(initialIndices);
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

  const calculateEMI = () => {
    const r = interestRate / 12 / 100;
    const n = loanTenure;
    const p = loanAmount;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmiResult(emi.toFixed(2));
  };

  const openEmiModal = (car) => {
    setEmiCar(car);
    setLoanAmount(car.price);
    setEmiModalOpen(true);
  };

  const closeEmiModal = () => {
    setEmiModalOpen(false);
    setEmiCar(null);
    setEmiResult(0);
  };

  const nextImage = (carId) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [carId]: (prevIndices[carId] + 1) % cars.find((car) => car.id === carId).images.length,
    }));
  };

  const prevImage = (carId) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [carId]: (prevIndices[carId] - 1 + cars.find((car) => car.id === carId).images.length) % cars.find((car) => car.id === carId).images.length,
    }));
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-black p-6 pt-24">
      <h1 className="text-4xl font-bold text-center mb-6 uppercase">Premium Used Cars</h1>
      <div className="flex flex-col md:flex-row">
        <button
          className="md:hidden bg-blue-600 text-whitepx-4 py-2 rounded-lg mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <div className={`md:w-1/4 w-full bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg ${showFilters ? 'block' : 'hidden'} md:block`}>
  <h2 className="text-2xl font-semibold mb-4">Filters</h2>
  <label className="block font-semibold">Price Range:</label>
  <Slider
    value={priceRange}
    onChange={(e, newValue) => setPriceRange(newValue)}
    valueLabelDisplay="auto"
    min={0}
    max={3000000}
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
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative"
            >
              <div className="relative">
                <img
                  src={car.images[currentImageIndices[car.id]]}
                  alt={car.name}
                  className="w-full h-32 object-cover"
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-500 transition"
                      onClick={() => prevImage(car.id)}
                    >
                      <FaArrowLeft className="text-white" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-500 transition"
                      onClick={() => nextImage(car.id)}
                    >
                      <FaArrowRight className="text-white" />
                    </button>
                  </>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{car.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {car.year} • {car.mileage} • {car.fuel} • {car.transmission}
                </p>
                <p className="text-gray-500 dark:text-gray-300">📍 {car.location}</p>
                <div className="flex items-center">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mr-12">
                    ₹{car.price.toLocaleString()}
                  </p>
                  <button
                    className="text-xs bg-green-600 text-white py-1 px-2 rounded-md hover:bg-green-500 transition"
                    onClick={() => openEmiModal(car)}
                  >
                    EMI CALCULATOR
                  </button>
                </div>
                <button
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                  onClick={() => navigate(`/usedpremiumcars/${car.id}`, { state: { car } })}
                >
                  View Details
                </button>
              </div>
              
            </div>
            
          ))}
           
        </div>
      
      </div>
       
      {emiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">EMI Calculator</h2>
            <p className="mb-2">Car: {emiCar.name}</p>
            <label className="block mb-2">Loan Amount (₹):</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <label className="block mb-2">Interest Rate (%):</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <label className="block mb-2">Loan Tenure (Months):</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition mb-4"
              onClick={calculateEMI}
            >
              Calculate EMI
            </button>
            {emiResult > 0 && (
              <p className="text-lg font-semibold">Monthly EMI: ₹{emiResult}</p>
            )}
            <button
              className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-300 transition"
              onClick={closeEmiModal}
            >
              Close
            </button>
          </div>
          
        </div>
        
      )}
        
    </div>
    <Footer />

     </>
  );
};

export default UsedPremiumCars;