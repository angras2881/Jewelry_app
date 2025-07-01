const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Jewelry = require('../models/jewelry');

const seedFile = path.join(__dirname, 'initialProducts.json');
const products = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));


mongoose.connect('mongodb://localhost:27017/jewelry-app')
  .then(async () => {
    console.log('✅ Connected to MongoDB (jewelry-app)');
    await Jewelry.deleteMany({});
    console.log('🧹 Existing products cleared');

    await Jewelry.insertMany(products);
    console.log('🌱 New products seeded successfully');

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
  });
