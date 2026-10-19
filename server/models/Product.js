const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Gear', 'Apparel', 'Field Guides'], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String },
  seasonTag: { type: String, default: 'Open Season' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);