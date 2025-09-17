const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// This is the full strategy configuration that was missing
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: '' // No password needed for OAuth users
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (err) {
        return done(err, false);
    }
}));

// Route to initiate Google login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// The callback route Google redirects to after a successful login
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Successful authentication, create a JWT
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Redirect to a special frontend route with the token
        res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
    });

module.exports = router;