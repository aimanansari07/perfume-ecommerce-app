const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Session and Passport Configuration ---
app.use(session({
    secret: 'your_session_secret_string', // Replace with a random secret
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Add this code block
const User = require('./models/user.model'); // Make sure User model is required

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // This is the new, modern style
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB database connection established successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    });

// --- API Routes ---
app.use('/uploads', express.static('uploads'));
app.use('/api/perfumes', require('./routes/perfumes'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth')); // New Auth Routes

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});