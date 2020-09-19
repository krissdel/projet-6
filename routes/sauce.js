const express = require('express');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const router = express.Router();


const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce);   //[Capture et enregistre l'image, analyse la sauce, enregistre ds la base de donées]
router.get('/', auth, sauceCtrl.getAllSauces);   //[renvoie le tableau de toutes les sauces ds la bases de données]
router.get('/:id', auth, sauceCtrl.getOneSauce);  //[Renvoie la sauce avec l'ID fourni]
router.put('/:id', auth, multer, sauceCtrl.modifySauce);   //[Met a jour les sauces ]
router.delete('/:id', auth, sauceCtrl.deleteSauce);   //[Supprime la sauce]
router.post("/:id/like", auth, sauceCtrl.likeSauces); // [like ou dislike lles sauces] 



module.exports = router;