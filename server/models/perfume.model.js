// server/models/perfume.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const perfumeSchema = new Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

const Perfume = mongoose.model('Perfume', perfumeSchema);

module.exports = Perfume;