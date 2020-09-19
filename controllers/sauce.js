const fs = require('fs');  //(file system) donne accès aux fonctions qui nous permettent de modifier le système de fichiers
const SaucesModel = require('../models/Sauce');


exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;       // Supprime l'id généré automatiquement
    const sauce = new SaucesModel({
        ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()   // Enregistre la sauce dans la base de données
    .then(() => res.status(201).json({message: 'Sauce enregistrées !'}))
    .catch(error => res.status(400).json({ error }));


};







exports.getAllSauces = (req, res) => {
  SaucesModel.find()
      .then(SaucesModel => res.status(200).json(SaucesModel))
      .catch(error => {
        // console.log("\n\n\nerror", error);
        res.status(400).json({ error })
      });
     
};

exports.getOneSauce = (req, res) => {
  SaucesModel.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
   
};



exports.modifySauce = (req, res) => {
   const sauceObject = req.file ?
   {
     ...JSON.parse(req.body.sauce),
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

   } : { ...req.body };
   SaucesModel.findOne({ _id: req.params.id })
    .then(sauce => {
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
  SaucesModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'mise a jour de la sauce !'}))
      .catch(error => res.status(400).json({ error }));   
  });
} else {
  SaucesModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch(error => res.status(400).json({ error }));
}
})
.catch(error => res.status(500).json({ error }));
};




exports.deleteSauce = (req, res) => {
    SaucesModel.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{            //assure que le fichier image correspondant est également supprimé.
        SaucesModel.deleteOne({_id: req.params.id }
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error })));
      });
    })
    .catch( error => error.status(500).json({ error}));
    
};




// =====[Like / dislike]=================



exports.likeSauces = (req, res) => {
  
  if (req.body.like === 1) {    //utilisateur like une sauce
    SaucesModel.updateOne({ _id: req.params.id }, {
      $set: { usersLiked: req.body.userId }, // Ajoute l'id de l'utilisateur à la liste des utilisateurs aimant la sauce
      $inc: { likes: 1 }, // Incrémente de 1 le nombre d'utilisateurs aimant la sauce
    })
      .then(() => res.status(200).json({ message: "like sauce !" }))
      .catch(error => res.status(400).json({ error }));
  }

  if (req.body.like === -1) {      // utilisateur dislike une sauce
    SaucesModel.updateOne({ _id: req.params.id }, {
      $set: { usersDisliked: req.body.userId }, // Ajoute l'id de l'utilisateur à la liste des utilisateurs n'aimant pas la sauce
      $inc: { dislikes: 1 }, // Incrémente de 1 le nombre d'utilisateurs n'aimant pas la sauce
    })
      .then(() => res.status(200).json({ message: "dislike sauce !" }))
      .catch(error => res.status(400).json({ error }));
  }
  
  if (req.body.like === 0) {    // utilisateur annule son like / dislike
    SaucesModel.findOne({ _id: req.params.id })
      .then(sauce => {
        const alreadyLiked = sauce.usersLiked.includes(req.body.userId); // Vérifie si la sauce a déjà un like de la part de l'utilisateur
        
        if (alreadyLiked) {   // Si déjas liké
          SaucesModel.updateOne({ _id: req.params.id }, {
            $pull: { usersLiked: req.body.userId }, // Supprime l'id de l'utilisateur de la liste des utilisateurs aimant la sauce
            $inc: { likes: -1 }, // Décrémente de 1 le nombre d'utilisateurs aimant la sauce
          })
            .then(() => res.status(200).json({ message: "like supprimé !" }))
            .catch(error => res.status(400).json({ error }));
        
        } else {   // Si déjas disliké
          SaucesModel.updateOne({ _id: req.params.id }, {
            $pull: { usersDisliked: req.body.userId }, // Supprime l'id de l'utilisateur de la liste des utilisateurs n'aimant pas la sauce
            $inc: { dislikes: -1 }, // Décrémente de 1 le nombre d'utilisateurs n'aimant pas la sauce
          })
            .then(() => res.status(200).json({ message: 'dislike supprimé !' }))
            .catch(error => res.status(400).json({ error }));
        }
      })
      .catch(error => res.status(500).json({ error }));
  }
};

