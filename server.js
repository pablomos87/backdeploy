const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`El servidor se esta escuchando en ${PORT}/`);
});

server.on('error', (err) => {
    console.log(`Error en servidor ${err}`);
});

module.exports = server;