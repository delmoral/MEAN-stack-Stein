const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: { type: String},
    userName: { type: String, unique: true, index: true, uniqueCaseInsensitive: true},
    password: String,
    avatar: { type: String, default: null},
    created_at: { type: Date, default: Date.now},
    lastLogin: { type: Date, default: Date.now}
});

profileSchema.plugin(uniqueValidator, { message: 'El {PATH} to be unique.'});

profileSchema.query.byUsername = (username) =>{
    return this.find({userName: username})
};

module.exports = mongoose.model('Profile', profileSchema);