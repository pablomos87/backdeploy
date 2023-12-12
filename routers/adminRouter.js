const express = require('express');
const adminRouter = express.Router();
const authenticateAdminToken = require ('../middleweres/tokenMiddlewere');
const { findAdmin, countAdmin, deleteAdminById, loginAdmin, registerAdmin } = require('../dao/controllers/adminController');

adminRouter.get('/', authenticateAdminToken, async (req, res) => {
  try {
    const allAdmins = await findAdmin();
    res.json({ admins: allAdmins });
  } catch (err) {
    console.error('Error al obtener todos los administradores:', err);
    res.status(500).json({ error: 'Error al obtener todos los adminsitradores' });
  }
});

adminRouter.post('/register', authenticateAdminToken,  registerAdmin);

adminRouter.post('/login', loginAdmin);

adminRouter.get('/count', authenticateAdminToken, async (req, res) => {
  try {
    const count = await countAdmin();
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener el contador de administradores:', err);
    res.status(500).json({ error: 'Error al obtener el contador de administradores' });
  }
});

adminRouter.delete('/delete', authenticateAdminToken, async (req, res) => {
  const {adminId} = req.body;
  await deleteAdminById(adminId)
  res.json({ message: `Administrador con ID ${adminId} eliminado exitosamente` });
});


module.exports = adminRouter;
