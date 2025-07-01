const mongoose = require('mongoose');

const jewelrySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0.01 },
  category: { type: String, trim: true },
  material: { type: String, trim: true },
  images: [{ type: String, trim: true }],
}, { timestamps: true });

const Jewelry = mongoose.model('Jewelry', jewelrySchema);

module.exports = Jewelry;
