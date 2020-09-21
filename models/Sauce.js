const mongoose = require('mongoose');   //facilite les interactions avec la base de données MongoDB
const Schema = mongoose.Schema;

// -----[ indique le type et le caractère des champs souhaités]-----------------------------------------------
const sauceSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    manufacturer:{type: String, required: true},
    mainPepper: {type: String, required: true},
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model('SaucesModel', sauceSchema);  //'SaucesModel' => nom du models