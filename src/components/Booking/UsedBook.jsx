import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const UsedBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car;

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    carModel: car ? car.name : "",
    additionalInfo: "",
    submitted: false,
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, carModel, additionalInfo } = userDetails;

    if (!name || !phone || !address || !carModel) {
      alert("Please fill all required fields.");
      return;
    }

    const message = `User Inquiry:\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPreferred Car Model: ${carModel}\nAdditional Info: ${additionalInfo}`;

    // Send WhatsApp message (Replace '91XXXXXXXXXX' with your actual WhatsApp number)
    const whatsappURL = `https://api.whatsapp.com/send?phone=919482549071&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    // Show Call Button After Submission
    setUserDetails({ ...userDetails, submitted: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 pt-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 bg-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-400 transition"
      >
        <IoArrowBack className="text-xl" />
      </button>

      {/* Form Container */}
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full transition-all transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Buy {car?.name || "a Used Car"}</h1>

        <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
          <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Your Phone Number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="email" name="email " placeholder="Your email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Your Address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <input type="text" name="carModel" value={userDetails.carModel} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          <textarea name="additionalInfo" placeholder="Additional Information" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows="3" onChange={handleChange}></textarea>

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg flex items-center justify-center gap-2">
            <FaWhatsapp className="text-xl" /> Submit Inquiry
          </button>
        </form>

        {/* Call Button Appears After Submission */}
        {userDetails.submitted && (
          <div className="mt-6 text-center animate-fadeIn">
            <p className="text-lg font-semibold text-gray-800">For more info, call us:</p>
            <a href="tel:919482549071" className="mt-2 inline-flex items-center justify-center bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg">
              <FaPhone className="mr-2" /> Call 919482549071
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsedBook;