const mongoose = require ("mongoose");
const connectDB = require("../../database/connection");

connectDB();


    const Course = mongoose.model ("Course", {
        nombre: String,
        resumen: String,
        palabrasClave: String,
        precio: Number,
        duracion: String,
        regularidad: String,
        certificacion: String,
        inscriptos: Number,
        imagen: String, 
        inicio: String,
        descripcion: String,
        requisitos: String,
        fechaInclusion: Date,
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        fechaInscripcion: Date,
    });
    
    module.exports = Course; 
