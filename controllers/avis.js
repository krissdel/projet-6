const avis = ('../models/avis');

exports.createAvis = (req, res, next) => {
    const avisObject = json.parse(req.body.avis);
    const avis = new avis({
        ...avisObject,
    });
    avis.save()
    .then(() => res.status(201).json({message: 'avis enregistrées'}))
    .catch(() => rest.status(400).json({ error}));
    next();

};
// exports.likeAvis = (req, res, next) => {
//     const likeObject = json.parse(req.body.avis);

//     const Like = new like({
//         //    --------------
//     });
//     like.save()
//     .then(() => res.status(201).json({message: "j'aime"}))
//     .catch(() => rest.status(400).json({ error}));
//     next();
    
// };

// exports.dislike = (req, res, next) => {
//     const dislike = new dislike({
//         //--------------------
//     });
//     dislike.save()
//     .then(() => res.status(201).json({message: "je n'aime pas"}))
//     .catch(() => rest.status(400).json({ error}));
//     next();
// };

// exports.modifyAvis = (req, res, next) => {
//     const avisObject = req.file ?
//     {
//       ...JSON.parse(req.body.sauces),
 
//     } : { ...req.body };
//    avis.updateOne({ _id: req.params.id }, { ...avisObject, _id: req.params.id })
//        .then(() => res.status(200).json({ message: 'mise a jour des avis !'}))
//        .catch(error => res.status(400).json({ error }));
//        next();
//    };







// exports.deleteAvis = (req, res, next) => {
    
// }
