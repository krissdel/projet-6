const mongoose = require('mongoose');



const saucesSchema = mongoose.Schema({
    title: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    manufacturer:{type: String, required: true},
    mainPapper: {type: String, required: true},
});


module.exports = mongoose.model('sauces', saucesSchema);