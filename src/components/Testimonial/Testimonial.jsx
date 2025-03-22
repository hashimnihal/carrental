import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "./firebaseConfig";
import { FaStar, FaEdit, FaTrash, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DefaultAvatar from "../../assets/default-avatar.png";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const reviewsContainerRef = useRef(null);
  const [focusedReviewIndex, setFocusedReviewIndex] = useState(null);

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
    if (!newReview.trim() || rating === 0) {
      alert("Please enter text and select a rating.");
      return;
    }

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
    if (user?.uid !== userId) {
      alert("You can only delete your own review.");
      return;
    }

    await deleteDoc(doc(db, "reviews", id));
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const startEditing = (id, text, rating) => {
    setEditingReviewId(id);
    setEditingText(text);
    setEditingRating(rating);
  };

  const editReview = async (id, userId) => {
    if (user?.uid !== userId) {
      alert("You can only edit your own review.");
      return;
    }

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

  const scrollReviews = (direction) => {
    if (reviewsContainerRef.current) {
      const scrollAmount = reviewsContainerRef.current.offsetWidth;
      reviewsContainerRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
      setScrollPosition(reviewsContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4">Customers Reviews</h2>
      <p className="text-center text-gray-600 mb-6">
        Hear what our customers say about us.
      </p>

      {!user ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">Login or Sign Up</h2>
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              onClick={handleSignUp}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
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
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            Logout
          </button>
        </div>
      )}

      <div className="relative">
        <div
          ref={reviewsContainerRef}
          className="flex overflow-x-auto scroll-smooth gap-6 mt-6"
        >
          {reviews.map(({ id, text, rating, userEmail, userId }, index) =>
            editingReviewId === id ? (
              <div
                key={id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(33.33%-2rem)] transition-transform duration-300 ${focusedReviewIndex === index ? "scale-105" : ""}`}
                onMouseEnter={() => setFocusedReviewIndex(index)}
                onMouseLeave={() => setFocusedReviewIndex(null)}
              >
                <div className="bg-purple-500 h-24"></div>
                <div className="flex justify-center -mt-12">
                  <img
                    src={DefaultAvatar}
                    alt="User"
                    className="rounded-full border-4 border-white w-24 h-24"
                  />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-lg font-bold">{userEmail.split("@")[0]}</h3>
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <div className="flex justify-center space-x-1 my-2">
                    {[...Array(5)].map((_, index) => {
                      const starValue = index + 1;
                      return (
                        <FaStar
                          key={index}
                          className={`text-xl ${
                            index < editingRating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          onClick={() => setEditingRating(starValue)}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => editReview(id, userId)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingReviewId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(33.33%-2rem)] transition-transform duration-300 ${focusedReviewIndex === index ? "scale-105" : ""}`}
                onMouseEnter={() => setFocusedReviewIndex(index)}
                onMouseLeave={() => setFocusedReviewIndex(null)}
              >
                <div className="bg-purple-500 h-24"></div>
                <div className="flex justify-center -mt-12">
                  <img
                    src={DefaultAvatar}
                    alt="User"
                    className="rounded-full border-4 border-white w-24 h-24"
                  />
                </div>
                <div className="text-center p-4">
                  <h3 className="text-lg font-bold">{userEmail.split("@")[0]}</h3>
                  <div className="flex justify-center space-x-1 my-2">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-xl ${
                          index < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    <FaQuoteLeft className="inline text-gray-400 mr-1" />
                    {text}
                  </p>
                  {user?.uid === userId && (
                    <div className="flex justify-center space-x-2 mt-4">
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
              </div>
            )
          )}
        </div>
        <button
          onClick={() => scrollReviews("left")}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow text-lg ${scrollPosition > 0 ? "block" : "hidden"}`}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => scrollReviews("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 p-3 rounded-full shadow text-lg"
        >
          <FaChevronRight />
        </button>
      </div>

      {user && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Your Review</h2>
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Write your review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <div className="flex items-center my-4">
            <p className="mr-3">Rating:</p>
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-2xl cursor-pointer ${
                  index < (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>
          <button
            onClick={addReview}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonial;