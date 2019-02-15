const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    nombre: String,
    file: String,
    video: String,
    estado: String
});

module.exports = mongoose.model('course', courseSchema, 'courses');