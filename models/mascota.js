
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre: String,
    descripcion: String
})

//se crea el modelo
const Mascota = mongoose.model('Mascota',mascotaSchema);
module.exports =  Mascota;