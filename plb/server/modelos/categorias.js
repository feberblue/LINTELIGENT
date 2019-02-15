const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categoriaSchema = new Schema({
    nombre : String,
    estado : String
});

module.exports = mongoose.model('category', categoriaSchema, 'categories');