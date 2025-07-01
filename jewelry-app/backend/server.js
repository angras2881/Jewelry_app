const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// Route imports
const jewelryRoutes = require('./routes/jewelryRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // to parse JSON in request bodies
app.use('/images', express.static(path.join(__dirname, 'uploads'))); // serve images

// ✅ API routes
app.use('/api/jewelry', jewelryRoutes);
app.use('/api/users', userRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jewelry-app', 
   {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
