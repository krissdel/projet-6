const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

const multer = require ('../middleware/multer-config');


router.post('/', auth, multer, saucesCtrl.createSauces);   //[Capture et enregistre l'image, analyse la sauce, enregistre ds la base de donées]
router.get('/', auth, saucesCtrl.getAllSauces);   //[renvoie le tableau de toutes les sauces ds la bases de données]
router.get('/:id', auth, saucesCtrl.getOneSauce);  //[Renvoie la sauce avec l'ID fourni]
router.put('/:id', auth, multer, saucesCtrl.modifySauces);   //[Met a jour les sauces ]
router.delete('/:id', auth, saucesCtrl.deleteSauces);   //[Supprime la sauce]
router.post("/:id/like", auth, saucesCtrl.likeSauces);

module.exports = router;