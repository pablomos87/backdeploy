
const adminSessionMiddlewere = (req, res, next) =>{
    
    if (req.session && req.session.user) {
    
      next();
    } else {
    
      res.status(401).json({ error: 'No se ha iniciado sesión' });
    }
  };

module.exports = adminSessionMiddlewere