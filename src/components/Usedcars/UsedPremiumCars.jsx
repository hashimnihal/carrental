import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";

const usedPremiumCars = [
  {
    id: 1,
    name: "Mercedes-Benz C-Class",
    price: "₹35,00,000",
    year: "2020",
    mileage: "25,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Bangalore",
    owner: "1st Owner",
    engine: "2.0L Turbo",
    seating: "5 Seater",
    color: "Black",
    image: car2,
  },
  {
    id: 2,
    name: "BMW 5 Series",
    price: "₹45,00,000",
    year: "2019",
    mileage: "30,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Mumbai",
    owner: "2nd Owner",
    engine: "3.0L Turbo Diesel",
    seating: "5 Seater",
    color: "White",
    image: car3,
  },
  {
    id: 3,
    name: "Audi A6",
    price: "₹42,00,000",
    year: "2018",
    mileage: "40,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Delhi",
    owner: "1st Owner",
    engine: "2.0L Turbo Petrol",
    seating: "5 Seater",
    color: "Blue",
    image: whiteCar,
  },
  {
    id: 4,
    name: "Jaguar XF",
    price: "₹48,50,000",
    year: "2021",
    mileage: "15,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Hyderabad",
    owner: "1st Owner",
    engine: "2.0L Turbo Diesel",
    seating: "5 Seater",
    color: "Grey",
    image: car3,
  },
];

const UsedPremiumCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(usedPremiumCars);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-6 pt-24">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-9 left-5 bg-gray-100 dark:bg-gray-400 p-3 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition z-50"
      >
        <IoArrowBack className="text-1.5xl text-black dark:text-white" />
      </button>

      <h1 className="text-5xl font-bold text-center mb-6 uppercase">
        PREMIUM USED CARS
      </h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-10">
        Explore our top-quality, pre-owned luxury cars at unbeatable prices.
      </p>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {car.year} • {car.mileage} • {car.fuel} • {car.transmission}
              </p>
              <p className="text-gray-500 dark:text-gray-300">📍 {car.location}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                🚗 {car.owner}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {car.price}
              </p>
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
  );
};

export default UsedPremiumCars;
