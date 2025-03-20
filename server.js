import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Allows parsing form data
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000', // ✅ Your frontend's origin
        credentials: true, // ✅ Allow sending cookies
    })
);

// ✅ Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // ✅ Stop the app on error
    });

// ✅ Review Schema and Model
const ReviewSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: Number,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with User model
    createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model('Review', ReviewSchema);

// ✅ User Schema and Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// ✅ Generate JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    console.log('🔍 Cookies received:', req.cookies); // ✅ Debugging log

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('❌ JWT Verification Error:', error.message); // ✅ Show error message
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// ✅ Register User
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists!', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Registration successful!', success: true });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message, success: false });
    }
});

// ✅ Login User and Set JWT Cookie
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials!', success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials!', success: false });
        }

        const token = generateToken(user._id);

        // ✅ Set JWT cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // ✅ Only secure in production
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // ✅ 1 hour
        });

        res.status(200).json({ message: 'Login successful!', success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message, success: false });
    }
});

// ✅ Get All Reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message }); // ✅ Include error message
    }
});

// ✅ Add a Review (Protected Route)
app.post('/api/reviews', verifyToken, async (req, res) => {
    const { name, description, rating } = req.body;
    const userId = req.user.userId; // Get user ID from the authenticated token

    if (!name || !description || rating == null) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const newReview = new Review({ name, description, rating, userId }); // Save userId with the review
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error saving review', error: error.message });
    }
});

// ✅ Delete a Review (Protected Route)
app.delete('/api/reviews/:id', verifyToken, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user owns the review
        if (review.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' }); // 403 Forbidden
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review deleted', deletedId: req.params.id });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
});

// ✅ Edit a Review (Protected Route)
app.put('/api/reviews/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, description, rating } = req.body;
    const userId = req.user.userId;

    try {
        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to edit this review.' }); // 403 Forbidden
        }

        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { name, description, rating },
            { new: true }
        );

        res.json({ success: true, message: 'Review updated successfully!', review: updatedReview });

    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ success: false, message: 'Failed to update review.' });
    }
});


// ✅ Logout User (Clear JWT Cookie)
app.post('/api/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }); // ✅ Add options for clarity
    res.status(200).json({ message: 'Logout successful!' });
});

// ✅ Get Logged-In User (Protected Route)
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));