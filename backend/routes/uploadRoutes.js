const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 🔧 Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || 'misc'; // fallback if category not passed
    const uploadPath = path.join(__dirname, '..', 'uploads', category);

    // Create folder if it doesn't exist
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const cleanName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${timestamp}-${cleanName}`);
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const category = req.body.category || 'misc';
  const relativePath = `${category}/${req.file.filename}`;

  res.json({
    message: '✅ Image uploaded successfully',
    path: relativePath
  });
});

module.exports = router;
