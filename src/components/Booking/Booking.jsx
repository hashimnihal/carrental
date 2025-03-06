import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};

  // State to store user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    pickupDate: "",
    dropoffDate: "",
  });

  // Update state when user inputs values
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, address, pickupDate, dropoffDate } = userDetails;

    if (!name || !phone || !address || !pickupDate || !dropoffDate) {
      alert("Please fill all details before confirming booking.");
      return;
    }

    // Your WhatsApp Number (Replace with your actual number)
    const whatsappNumber = "919482549071"; // Use your WhatsApp number in international format

    // Format the message for WhatsApp
    const message = `🚗 *Car Booking Request*\n\n` +
      `🛻 *Car:* ${car.name}\n` +
      `💰 *Price:* ₹${car.price}/Day\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `🏠 *Address:* ${address}\n` +
      `📅 *Pickup Date:* ${pickupDate}\n` +
      `📅 *Drop-off Date:* ${dropoffDate}\n\n` +
      `✅ Please confirm my booking.`;

    // Encode message for WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp chat
    window.open(whatsappURL, "_blank");
  };

  if (!car)
    return (
      <p className="text-center mt-10 text-lg">
        No car selected! Go back to {" "}
        <button onClick={() => navigate("/")} className="text-blue-600 underline">
          Car List
        </button>
      </p>
    );

  return (
    <div className="container mx-auto mt-28 p-6 bg-white shadow-lg rounded-lg max-w-lg sm:max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Book Your Car</h1>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img src={car.image} alt={car.name} className="w-64 h-40 object-contain" />
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">{car.name}</h2>
          <p className="text-lg">💰 Price: ₹{car.price}/Day</p>
          <p>{car.description}</p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          value={userDetails.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={userDetails.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={userDetails.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        
        <label className="block font-semibold">📅 Pickup Date:</label>
        <input
          type="date"
          name="pickupDate"
          value={userDetails.pickupDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />

        <label className="block font-semibold">📅 Drop-off Date:</label>
        <input
          type="date"
          name="dropoffDate"
          value={userDetails.dropoffDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;






