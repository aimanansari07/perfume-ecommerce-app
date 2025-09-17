const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google Sign-in
    role: {
        type: String,
        enum: ['user', 'admin'], // The role can only be 'user' or 'admin'
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;