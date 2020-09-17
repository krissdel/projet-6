const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sauceSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    manufacturer:{type: String, required: true},
    mainPapper: {type: String, required: true},
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model('SaucesModel', sauceSchema);  //'Sauce' => nom du models