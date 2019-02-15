const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName : String,
    lastName : String,
    userName : String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', userSchema, 'users');