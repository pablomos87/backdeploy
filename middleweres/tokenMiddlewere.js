const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log('El token recibido es:', token);
  console.log('TOKEN_SECTRET es:', TOKEN_SECRET);

  if (!token) {
    console.log('Token no proporcionado');
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
      console.log('Error al verificar el token:', err.message);
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    console.log('El token es válido');
    next();
  });
};

module.exports = authenticateToken;


const authenticateAdminToken = (req, res, next) => {
  const adminToken = req.headers.authorization.split(' ')[1];
  console.log('El token recibido es:', token);
  console.log('TOKEN_SECTRET es:', TOKEN_SECRET);

  if (!token) {
    console.log('Token de adminsitrador no proporcionado');
    return res.status(401).json({ message: 'Token de administrador no proporcionado' });
  }

  jwt.verify(adminToken, TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
      console.log('Error al verificar el token del administrador:', err.message);
      return res.status(401).json({ message: 'Token de admnistrador inválido' });
    }

    req.user = decoded;
    console.log('El token del administrador es válido');
    next();
  });
};

module.exports = authenticateToken; authenticateAdminToken;