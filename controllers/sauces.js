const fs = require('fs');  //(file system) donne accès aux fonctions qui nous permettent de modifier le système de fichiers
const Sauces = ('../models/Sauces');

exports.createSauces = (req, res) => {
    const saucesObject = JSON.parse(req.body.sauces);
    delete saucesObject._id;       // Supprime l'id généré automatiquement
    const sauces = new Sauces({
        ...saucesObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauces.save()   // Enregistre la sauce dans la base de données
    .then(() => res.status(201).json({message: 'Sauces enregistrées'}))
    .catch(() => res.status(400).json({ error }));
    

};


exports.getAllSauces = (req, res) => {
    Sauces.find()
      .then(Sauces => res.status(200).json(Sauces))
      .catch(error => res.status(400).json({ error }));
     
};

exports.getOneSauce = (req, res) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
   
};



exports.modifySauces = (req, res) => {
   const saucesObject = req.file ?
   {
     ...JSON.parse(req.body.sauces),
     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

   } : { ...req.body };
   Sauces.findOne({ _id: req.params.id })
    .then(sauces => {
      if (req.file) {
        const filename = sauces.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
  Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'mise a jour des sauces !'}))
      .catch(error => res.status(400).json({ error }));   
  });
} else {
  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch(error => res.status(400).json({ error }));
}
})
.catch(error => res.status(500).json({ error }));
};




exports.deleteSauces = (req, res) => {
    Sauces.findOne({ _id: req.params.id})
    .then(sauces => {
      const filename = sauces.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{            //assure que le fichier image correspondant est également supprimé.
        Sauces.deleteOne({_id: req.params.id }
        .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
        .catch(error => res.status(400).json({ error })));
      });
    })
    .catch( error => error.status(500).json({ error}));
    
};




// =====[Like / dislike]=================



exports.likeSauces = (req, res) => {
  
  if (req.body.like === 1) {    //utilisateur like une sauce
    Sauces.updateOne({ _id: req.params.id }, {
      $set: { usersLiked: req.body.userId }, // Ajoute l'id de l'utilisateur à la liste des utilisateurs aimant la sauce
      $inc: { likes: 1 }, // Incrémente de 1 le nombre d'utilisateurs aimant la sauce
    })
      .then(() => res.status(200).json({ message: "sauce liké !" }))
      .catch(error => res.status(400).json({ error }));
  }

  if (req.body.like === -1) {      // utilisateur dislike une sauce
    Sauces.updateOne({ _id: req.params.id }, {
      $set: { usersDisliked: req.body.userId }, // Ajoute l'id de l'utilisateur à la liste des utilisateurs n'aimant pas la sauce
      $inc: { dislikes: 1 }, // Incrémente de 1 le nombre d'utilisateurs n'aimant pas la sauce
    })
      .then(() => res.status(200).json({ message: "sauce disliké !" }))
      .catch(error => res.status(400).json({ error }));
  }
  
  if (req.body.like === 0) {    // utilisateur annule son like / dislike
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => {
        const alreadyLiked = sauces.usersLiked.includes(req.body.userId); // Vérifie si la sauce a déjà un like de la part de l'utilisateur
        
        if (alreadyLiked) {   // Si déjas liké
          Sauces.updateOne({ _id: req.params.id }, {
            $pull: { usersLiked: req.body.userId }, // Supprime l'id de l'utilisateur de la liste des utilisateurs aimant la sauce
            $inc: { likes: -1 }, // Décrémente de 1 le nombre d'utilisateurs aimant la sauce
          })
            .then(() => res.status(200).json({ message: "like supprimé !" }))
            .catch(error => res.status(400).json({ error }));
        
        } else {   // Si déjas disliké
          Sauces.updateOne({ _id: req.params.id }, {
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

