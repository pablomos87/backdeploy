const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CONNECTION_URL = `mongodb+srv://mosconpablo:${DB_PASSWORD}@pablomoscon.5ogxgiw.mongodb.net/${DB_NAME}`;

const connectDB = async () => {
    try {
        await await mongoose.connect(CONNECTION_URL);
        console.log("Conexión exitosa");
    } catch (err) {
        console.error("Error de conexión a la base de datos:", err);
    }
};

module.exports = connectDB;