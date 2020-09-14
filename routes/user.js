const express = require ('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/signup', userCtrl.signup); // crée nouvel utilisateur
router.post('/login', userCtrl.login);  //  connect utilisateur

module.exports = router;