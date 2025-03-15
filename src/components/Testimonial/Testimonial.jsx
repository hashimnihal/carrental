import React, { useState, useEffect } from "react";

const Testimonial = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [reviewerName, setReviewerName] = useState("");

  useEffect(() => {
    setReviews(JSON.parse(localStorage.getItem("reviews")) || []);
    setLoggedInUser(localStorage.getItem("loggedInUser") || null);
  }, []);

  const saveReviews = (updatedReviews) => {
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.trim() || !reviewerName.trim()) return alert("Please fill all fields!");
    if (rating === 0) return alert("Please select at least 1 star!");

    const newReview = { name: reviewerName, description: review, rating };

    if (editingIndex !== null) {
      reviews[editingIndex] = newReview;
      saveReviews([...reviews]);
      setEditingIndex(null);
    } else {
      saveReviews([newReview, ...reviews]);
    }

    setReview("");
    setReviewerName("");
    setRating(0);
    setHoverRating(0);
  };

  const handleDelete = (index) => {
    saveReviews(reviews.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setReview(reviews[index].description);
    setReviewerName(reviews[index].name);
    setRating(reviews[index].rating);
    setEditingIndex(index);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return alert("Enter username and password!");

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (isRegistering) {
      if (users[username]) return alert("Username already exists!");
      users[username] = { password };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! Please login.");
      setIsRegistering(false);
    } else {
      if (!users[username] || users[username].password !== password) return alert("Invalid credentials!");
      localStorage.setItem("loggedInUser", username);
      setLoggedInUser(username);
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
      <div className="container">
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-3xl font-semibold">Customer Reviews</h2>
          {!loggedInUser ? (
            <button onClick={() => setShowLoginModal(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
          {reviews.length > 0 ? (
            reviews.map((r, index) => (
              <div key={index} className="card text-center p-4 dark:bg-white/20 bg-gray-100 rounded-lg">
                <div className="text-3xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= r.rating ? "text-yellow-500" : "text-gray-400"}>★</span>
                  ))}
                </div>
                <p className="text-gray-600">{r.description}</p>
                <p className="font-semibold mt-2">{r.name}</p>
                {loggedInUser && (
                  <div className="mt-3">
                    <button onClick={() => handleEdit(index)} className="text-blue-500">Edit</button> |
                    <button onClick={() => handleDelete(index)} className="text-red-500 ml-2">Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No reviews yet. Be the first to write one!</p>
          )}
        </div>

        {loggedInUser ? (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto p-6 border rounded-lg bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <input
              type="text"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full p-2 border rounded mb-3"
            />
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              required
              className="w-full p-2 border rounded mb-3"
            ></textarea>

            {/* Star Rating */}
            <div className="flex justify-center space-x-2 mb-4 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= (hoverRating || rating) ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Submit</button>
          </form>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            <span onClick={() => setShowLoginModal(true)} className="text-blue-500 cursor-pointer">
              Please login to write a review
            </span>
          </p>
        )}

        {showLoginModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{isRegistering ? "Register" : "Login"}</h2>
              <form onSubmit={handleAuth}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="w-full p-2 border rounded mb-3" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded mb-3" />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">{isRegistering ? "Register" : "Login"}</button>
              </form>
              <p className="mt-2 text-center cursor-pointer text-blue-500" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;















