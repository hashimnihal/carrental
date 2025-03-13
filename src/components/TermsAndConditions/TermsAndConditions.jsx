import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
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

      <h1 className="text-3xl font-bold mb-4 text-center">Terms & Conditions</h1>
      <p className="mb-4">
        Welcome to Smart Cars! By using our website and services, you agree to the following Terms & Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        These terms govern your use of our website and rental services. Please read them carefully before proceeding.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. User Eligibility</h2>
      <p className="mb-4">
        To rent a vehicle, you must be at least 21 years old and possess a valid driver's license.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Booking & Payments</h2>
      <p className="mb-4">
        - All bookings must be made in advance.  
        - Payment is required at the time of booking.  
        - Cancellations made 24 hours before the rental date are eligible for a full refund.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. User Responsibilities</h2>
      <p className="mb-4">
        - The rented car must be returned in the same condition it was received.  
        - Any damages caused by the renter will be charged accordingly.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Prohibited Activities</h2>
      <p className="mb-4">
        - Using the car for illegal activities is strictly prohibited.  
        - Sub-renting the vehicle to another party is not allowed.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Liability Limitations</h2>
      <p className="mb-4">
        - We are not responsible for accidents, theft, or personal belongings left in the car.  
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Privacy Policy</h2>
      <p className="mb-4">
                Your personal information is protected according to our{" "}
                <a href="/privacy-policy" className="text-blue-500 underline">Privacy Policy</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Dispute Resolution</h2>
      <p className="mb-4">
        Any disputes shall be resolved through arbitration in Our Showroom.
      </p>

      <p className="mt-6 text-center">
        By using our services, you agree to these Terms & Conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;


