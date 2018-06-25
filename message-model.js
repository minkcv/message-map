var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
    name: String,
    lat: Number,
    long: Number
})

module.exports = mongoose.model('Message', MessageSchema);