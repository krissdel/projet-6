 const { syncBuiltinESMExports } = require("module");

const Sauces = ('../models/Sauces');

exports.createSauces = (req, res, next) => {
    // delete req.body._id;
    const sauces = new sauces({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message: 'Sauces enregistrées'}))
    .catch(() => rest.status(400).json({ error}));
  };

exports.sendSauces = (req, res, next) => {
    Sauces.find()
     .then(sauces => res.status(200).json({sauces: Sauces }))
     .catch(error => res.status(400).json({error}));
  };

exports.modifySauces = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'mise a jour des sauces !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteSauces = (req, res, next) => {
    sauces.delete({_id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.findOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }));
  }