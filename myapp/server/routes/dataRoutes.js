const express = require('express');
const { getData, createData } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getData);
router.post('/', protect, createData);

module.exports = router;
