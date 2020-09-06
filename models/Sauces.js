const mongoose = require('mongoose');

// const uniqueValidator = require('mongoose-unique-validator');


const saucesSchema = mongoose.Schema({
    title: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    manufacturer:{type: String, required: true},
    mainPapper: {type: String, required: true},
});

// saucesShema.plugin(uniqueValidator);

module.exports = mongoose.model('sauces', saucesSchema);