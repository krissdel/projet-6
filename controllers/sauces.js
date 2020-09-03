// const { syncBuiltinESMExports } = require("module");
// const { json } = require("body-parser");

const Sauces = ('../models/Sauces');
const fs = require('fs');

exports.createSauces = (req, res, next) => {
    const saucesObject = json.parse(req.body.sauces);
    const sauces = new sauces({
        ...saucesObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${res.file.filename}`
    });
    sauces.save()
    .then(() => res.status(201).json({message: 'Sauces enregistrées'}))
    .catch(() => rest.status(400).json({ error}));
  };

exports.sendSauces = (req, res, next) => {
    Sauces.find()
     .then(sauces => res.status(200).json({sauces: Sauces }))
     .catch(error => res.status(400).json({error}));
  };

exports.modifySauces = (req, res, next) => {
   const saucesObject = req.file ?
   {
     ...JSON.parse(req.body.sauces),
     imageUrl: `${req.protocol}://${req.get('host')}/images/${res.file.filename}`

   } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'mise a jour des sauces !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteSauces = (req, res, next) => {
    sauces.findOne({ _id: req.params.id})
    .then(sauces => {
      const filename = sauces.imageUrl.split('/images/')[2];
      fs.unlink(`images/${filename}`, () =>{
        sauces.deleteOne({_id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      } )
    })
    .catch( error => error.status(500).json({ error}));
    
};

exports.findOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
  }