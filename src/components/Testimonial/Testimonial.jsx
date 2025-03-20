import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonial = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [editingReview, setEditingReview] = useState(null);
    const [reviewerName, setReviewerName] = useState("");
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        fetchReviews();
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            setShowLoginModal(false);
        }
    }, [loggedInUser]);

    const fetchReviews = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/reviews");
            setReviews(res.data);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    const checkLoginStatus = async () => {
        try {
            console.log("🔍 Checking login status...");
            const res = await axios.get("http://localhost:5000/api/user", {
                withCredentials: true,
            });

            if (res.data.user) {
                console.log("✅ User logged in:", res.data.user.username);
                setLoggedInUser(res.data.user.username);
                setLoggedInUserId(res.data.user._id); // Store the user's _id
            } else {
                console.log("❌ No user logged in");
                setLoggedInUser(null);
                setLoggedInUserId(null); // Reset loggedInUserId when no user is logged in
            }
        } catch (error) {
            console.error("❌ Error checking login status:", error);
            setLoggedInUser(null);
            setLoggedInUserId(null); // Reset loggedInUserId on error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!review.trim() || !reviewerName.trim()) {
            return alert("Please fill all fields!");
        }
        if (rating === 0) {
            return alert("Please select at least 1 star!");
        }

        const newReview = { name: reviewerName, description: review, rating };

        try {
            if (editingReview) {
                await axios.put(`http://localhost:5000/api/reviews/${editingReview}`, newReview, { withCredentials: true });
                setEditingReview(null);
            } else {
                await axios.post("http://localhost:5000/api/reviews", newReview, { withCredentials: true });
            }

            fetchReviews();
            setReview("");
            setReviewerName("");
            setRating(0);
            setHoverRating(0);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`, { withCredentials: true });
            setReviews(reviews.filter((r) => r._id !== id));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleEdit = (review) => {
        setReview(review.description);
        setReviewerName(review.name);
        setRating(review.rating);
        setEditingReview(review._id);
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setAuthError("");

        if (!username.trim() || !password.trim()) {
            setAuthError("Enter username and password!");
            return;
        }

        const authEndpoint = isRegistering ? "http://localhost:5000/api/register" : "http://localhost:5000/api/login";

        try {
            console.log("Sending login/register request...");
            const response = await axios.post(authEndpoint, { username, password }, { withCredentials: true });

            if (response.data.success) {
                console.log("Login/Register successful, checking login status...");
                await checkLoginStatus();
                console.log("After checkLoginStatus:", loggedInUser, loggedInUserId);
                setShowLoginModal(false);
                setUsername("");
                setPassword("");
            } else {
                console.log("Login/Register failed:", response.data.message);
                setAuthError(response.data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            setAuthError("Failed to connect to the server or authentication failed.");
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
            setLoggedInUser(null);
            setLoggedInUserId(null); // Reset loggedInUserId on logout
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const toggleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
        setIsRegistering(false);
        setAuthError("");
        setUsername("");
        setPassword("");
    };

    return (
        <div className="dark:bg-dark dark:text-white relative min-h-screen flex items-center justify-center bg-slate-200 text-black border-slate-400 pb-20 mb-20">
            <div className="container">
                <div className="flex justify-between items-center pb-6">
                    <h2 className="text-3xl font-semibold">Customer Reviews</h2>
                    {!loggedInUser ? (
                        <button onClick={toggleLoginModal} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Login
                        </button>
                    ) : (
                        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
                    {reviews.length > 0 ? (
                        reviews.map((r) => (
                            <div key={r._id} className="card text-center p-4 dark:bg-white/20 bg-gray-100 rounded-lg">
                                <div className="text-3xl">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className={star <= r.rating ? "text-yellow-400 drop-shadow-md" : "text-gray-500"}>★</span>
                                    ))}
                                </div>
                                <p className="text-gray-600">{r.description}</p>
                                <p className="font-semibold mt-2">{r.name}</p>
                                {loggedInUser && loggedInUserId === r.userId && (
                                    <div className="mt-3">
                                        <button onClick={() => handleEdit(r)} className="text-blue-500">Edit</button> |
                                        <button onClick={() => handleDelete(r._id)} className="text-red-500 ml-2">Delete</button>
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
                        <h3 className="text-xl font-semibold mb-4">{editingReview ? "Edit Review" : "Write a Review"}</h3>
                        <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} placeholder="Your Name" required className="w-full p-2 border rounded mb-3" />
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review..." required className="w-full p-2 border rounded mb-3"></textarea>

                        <div className="flex justify-center space-x-2 mb-4 text-3xl">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={star <= (hoverRating || rating) ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">{editingReview ? "Update" : "Submit"}</button>
                    </form>
                ) : (
                    <p className="text-center text-gray-500 mt-4">
                        <span onClick={toggleLoginModal} className="text-blue-500 cursor-pointer">
                            Please login to write a review
                        </span>
                    </p>
                )}

                {showLoginModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-md relative">
                            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">{isRegistering ? "Register" : "Login"}</h2>
                            {authError && <p className="text-red-500 mb-2">{authError}</p>}
                            <form onSubmit={handleAuth}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-2 border rounded mb-3 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border rounded mb-3 text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    required
                                />
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">
                                    {isRegistering ? "Register" : "Login"}
                                </button>
                            </form>
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                {isRegistering ? (
                                    <>
                                        Already have an account?{" "}
                                        <button type="button" onClick={() => setIsRegistering(false)} className="text-blue-500">
                                            Login
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Don't have an account?{" "}
                                        <button type="button" onClick={() => setIsRegistering(true)} className="text-blue-500">
                                            Register
                                        </button>
                                    </>
                                )}
                            </p>
                            <button onClick={toggleLoginModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M15.78 14.36a1 1 0 01-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 11-1.42-1.42l2.83-2.82-2.83-2.83a1 1 0 111.42-1.42l2.83 2.83 2.82-2.83a1 1 0 011.42 1.42l-2.82 2.82zM12 2a10 10 0 100 20 10 10 0 000-20z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonial;