const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
