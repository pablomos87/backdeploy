const express = require('express');
const adminRouter = express.Router();
const bcrypt = require('bcrypt');
const {
  findAdmin,
  isValidAdminCredentials,
  findAdminByAdminName,
  createAdmin,
  countAdmin,
  deleteAdminById,
} = require('../dao/controllers/adminController');

adminRouter.get('/', async (req, res) => {
  try {
    const allAdmins = await findAdmin();
    res.json({ admins: allAdmins });
  } catch (err) {
    console.error('Error al obtener todos los administradores:', err);
    res.status(500).json({ error: 'Error al obtener todos los adminsitradores' });
  }
});

adminRouter.post('/register', async (req, res) => {
  try {
    const { name, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const existingAdmin = await findAdminByAdminName(name);
    if (existingAdmin) {
      return res.status(400).json({ error: 'El administrador ya existe' });
    }

    await createAdmin({ name, password });
    res.json({ message: 'Administrador registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


adminRouter.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const admin = { name, password };
  
  try {
    const result = await isValidAdminCredentials(admin);
    if (result.ok) {
        req.session.admin =  name
      res.cookie('adminSession', JSON.stringify(admin), {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      console.log('Sesión de administrador establecida:', req.session.admin);
      res.json({ message: 'Administrador logeado correctamente' }); 
    } else {
      res.status(401).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

adminRouter.post('/logout', (req, res) => {
  if (req.cookies.userSession) {
    res.clearCookie('userSession');
    res.json({ message: 'Sesión cerrada exitosamente' });
  } else {
    res.status(401).json({ error: 'No hay sesión activa' });
  }
});

adminRouter.get('/count', async (req, res) => {
  try {
    const count = await countAdmin();
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener el contador de administradores:', err);
    res.status(500).json({ error: 'Error al obtener el contador de administradores' });
  }
});

adminRouter.delete('/delete', async (req, res) => {
  const {adminId} = req.body;
  await deleteAdminById(adminId)
  res.json({ message: `Administrador con ID ${adminId} eliminado exitosamente` });
});


module.exports = adminRouter;
