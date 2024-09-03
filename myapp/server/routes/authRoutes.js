const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
  check('username').notEmpty().withMessage('O nome de usuário é obrigatório').trim().escape(),
  check('email').isEmail().withMessage('E-mail inválido').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres').trim().escape()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  authController.register(req, res, next);
});

router.post('/login', [
  check('username').notEmpty().withMessage('O nome de usuário é obrigatório').trim().escape(),
  check('password').notEmpty().withMessage('A senha é obrigatória').trim().escape()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  authController.login(req, res, next);
});

router.post('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});


module.exports = router;
