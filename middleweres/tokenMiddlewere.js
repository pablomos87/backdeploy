const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const userToken = req.headers.authorization.split(' ')[1];

  if (!userToken) {
    
    return res.status(401).json({ message: 'UserToken no proporcionado' });
  }

  jwt.verify(userToken, TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
      console.log('Error al verificar el userToken:', err.message);
      return res.status(401).json({ message: 'UserToken inválido' });
    }

    req.user = decoded;
    console.log('El userToken es válido');
    next();
  });
};

module.exports = authenticateToken;


const authenticateAdminToken = (req, res, next) => {
  const adminToken = req.headers.authorization.split(' ')[1];
  

  if (!adminToken) {

    return res.status(401).json({ message: 'AdminToken de administrador no proporcionado' });
  }

  jwt.verify(adminToken, TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
      console.log('Error al verificar el adminToken del administrador:', err.message);
      return res.status(401).json({ message: 'AdminToken de admnistrador inválido' });
    }

    req.user = decoded;
    
    next();
  });
};

module.exports = authenticateAdminToken;