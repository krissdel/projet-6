const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/avis');

// const auth = require('../middleware/auth');

router.post('/like', userCtrl.like);
router.post('/dislike', userCtrl.dislike);
router.put('/like', userCtrl.like);
router.put('/dislike', userCtrl.dislike);
router.delete('/like', userCtrl.like);
router.delete('/dislike', userCtrl.dislike);

module.exports = router;