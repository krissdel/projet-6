const mongoose = require('mongoose');

const avisSchema = mongoose.Schema({
    like: {type: String, required: true},
    dislike: { type: String, required: true}
});

module.exports = mongoose.model('avis', avisSchema);