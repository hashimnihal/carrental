import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-10 pt-24 text-gray-800 dark:text-gray-300">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="mb-4">
        This Privacy Policy explains how we collect, use, and protect your personal data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        - Personal data: Name, email, phone number, payment details.  
        - Usage data: IP address, browser type, pages visited.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        - To provide and improve our services.  
        - To process transactions securely.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="mb-4">
        We implement strict security measures to protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
      <p className="mb-4">
        - You have the right to access, update, or delete your data.  
        - Contact us for any concerns about your privacy.  
      </p>

      <p className="mt-6 text-center">
        For any questions, email us at <a href="mailto:support@smartcars.com" className="text-blue-500 underline">support@smartcars.com</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
