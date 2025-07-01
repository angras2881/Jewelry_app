const Jewelry = require('../models/jewelry');

// GET /api/jewelry?category=Earrings
const getJewelry = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    const items = await Jewelry.find(query);
    res.json(items);
  } catch (err) {
    console.error('Error fetching jewelry:', err);
    res.status(500).json({ message: 'Server error while fetching jewelry' });
  }
};

// GET /api/jewelry/:id
const getJewelryById = async (req, res) => {
  try {
    const item = await Jewelry.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Jewelry item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching by ID:', err);
    res.status(500).json({ message: 'Server error while fetching item by ID' });
  }
};

module.exports = { getJewelry, getJewelryById };
