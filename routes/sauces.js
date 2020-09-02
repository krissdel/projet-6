const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');


// router.post('/', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({message: 'une sauce'})
// });

router.post('/', auth, saucesCtrl.createSauces);   //[Capture et enregistre l'image, analyse la sauce, enregistre ds la base de donées]
router.get('/', auth, saucesCtrl.sendSauces);   //[renvoie le tableau de toutes les sauces ds la bases de données]
router.put('/:id', auth, saucesCtrl.modifySauces);   //[Met a jour les sauces ]
router.delete('/:id', auth, saucesCtrl.deleteSauces);   //[Supprime la sauce]
router.get('/:id', auth, saucesCtrl.findOneSauce);  //[Renvoie la sauce avec l'ID fourni]


// -----[Définit le status "j'aime"]-------------------------------------------------------------------------------------------------------------------------------------------




module.exports = router;