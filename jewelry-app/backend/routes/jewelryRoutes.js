const express = require('express');
const router = express.Router();
const { getJewelry, getJewelryById } = require('../controllers/jewelryController');

router.get('/', getJewelry);
router.get('/:id', getJewelryById);

module.exports = router;
