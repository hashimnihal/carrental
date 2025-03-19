import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Footer from "../Footer/Footer";

const UsedBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car;

  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    carModel: car ? car.name : "",
    additionalInfo: "",
  });
  const [showCallOption, setShowCallOption] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, address, carModel, additionalInfo } = userDetails;

    if (!name || !phone || !email || !address || !carModel) {
      alert("Please fill all required fields.");
      return;
    }

    const message = `User Inquiry:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nPreferred Car Model: ${carModel}\nAdditional Info: ${additionalInfo}`;
    const whatsappURL = `https://api.whatsapp.com/send?phone=919482549071&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    setShowCallOption(true);
    setSubmissionMessage("Your Booking is Submitted! We'll contact you back soon.");
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400 transition-colors duration-300"
      >
        <IoArrowBack className="text-xl" />
      </button>

      <div className="max-w-md mx-auto mt-16 sm:mt-24">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
            Buy {car?.name || "a Used Car"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {submissionMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline">{submissionMessage}</span>
              </div>
            )}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="carModel"
              value={userDetails.carModel}
              className="w-full p-3 border rounded-lg bg-gray-100"
              readOnly
            />
            <textarea
              name="additionalInfo"
              placeholder="Additional Information"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors duration-300"
            >
              <FaWhatsapp className="text-xl" /> Submit Inquiry
            </button>
            {/* Contact for more info inside the form */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">Need more info? Call us:</p>
              <a
                href="tel:919482549071"
                className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-300"
              >
                <FaPhoneAlt className="text-xl" /> Call 9482549071
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UsedBook;