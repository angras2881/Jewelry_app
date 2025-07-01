const mongoose = require('mongoose');
const path = require('path');
const Jewelry = require(path.resolve(__dirname, '../models/jewelry.js'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jewelry-store')
  .then(async () => {
    console.log('✅ Connected to MongoDB for duplicate cleanup');

    const seenNames = new Set();
    const allProducts = await Jewelry.find({});
    let removedCount = 0;

    for (const product of allProducts) {
      if (seenNames.has(product.name)) {
        await Jewelry.findByIdAndDelete(product._id);
        removedCount++;
      } else {
        seenNames.add(product.name);
      }
    }

    console.log(`🧹 Removed ${removedCount} duplicate products`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Error:', err);
  });
