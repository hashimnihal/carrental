import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    const fetchReviews = async () => {
      const reviewsCollection = await getDocs(collection(db, "reviews"));
      setReviews(reviewsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchReviews();
  }, []);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Sign Up Failed: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const addReview = async () => {
    if (!newReview.trim() || rating === 0)
      return alert("Please enter text and select a rating.");

    const reviewDoc = await addDoc(collection(db, "reviews"), {
      text: newReview,
      rating,
      userId: user.uid,
      userEmail: user.email,
      timestamp: new Date(),
    });

    setReviews([
      ...reviews,
      { id: reviewDoc.id, text: newReview, rating, userId: user.uid, userEmail: user.email },
    ]);
    setNewReview("");
    setRating(0);
  };

  const deleteReview = async (id, userId) => {
    if (user?.uid !== userId)
      return alert("You can only delete your own review.");

    await deleteDoc(doc(db, "reviews", id));
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const startEditing = (id, text, rating) => {
    setEditingReviewId(id);
    setEditingText(text);
    setEditingRating(rating);
  };

  const editReview = async (id, userId) => {
    if (user?.uid !== userId)
      return alert("You can only edit your own review.");

    await updateDoc(doc(db, "reviews", id), {
      text: editingText,
      rating: editingRating,
    });
    setReviews(
      reviews.map((review) =>
        review.id === id
          ? { ...review, text: editingText, rating: editingRating }
          : review
      )
    );
    setEditingReviewId(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">Customer Response</h2>
      {!user ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Login or Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium">Welcome, {user.email}!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-3 transition duration-300"
          >
            Logout
          </button>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full">
            <h3 className="text-xl font-semibold mb-3">Write a Review</h3>
            <div className="flex justify-center space-x-1 mb-3">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer text-2xl ${
                      starValue <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
            <textarea
              placeholder="Share your experience..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-3 border rounded"
            />
            <button
              onClick={addReview}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-3 transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="space-y-4">
          {reviews.map(({ id, text, rating, userId, userEmail }) =>
            editingReviewId === id ? (
              <div key={id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="w-3/4 p-2 border rounded mr-4"
                />
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className={`cursor-pointer text-2xl ${
                          starValue <= editingRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => setEditingRating(starValue)}
                      />
                    );
                  })}
                  <button
                    onClick={() => editReview(id, userId)}
                    className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingReviewId(null)}
                    className="bg-gray-50text-white px-3 py-1 rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div key={id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className="w-3/4">
                  <p className="text-gray-700">
                    <strong className="text-blue-600">{userEmail}</strong>: {text}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-xl ${
                          index < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {user?.uid === userId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(id, text, rating)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteReview(id, userId)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;