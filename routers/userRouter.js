const express = require('express');
const userRouter = express.Router();
const authenticateUser = require ('../middleweres/sessionMiddlewere')
const {
  getAllUsers,
  findUserByUsername,
  deleteUserById,
  countUsers,
  updateUserById,
  loginUser,
  registerUser,
  logoutUser,
} = require('../dao/controllers/userController');
const bcrypt = require('bcrypt');

userRouter.get('/', authenticateUser, async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.json({ users: allUsers });
  } catch (err) {
    console.error('Error al obtener todos los usuarios:', err);
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
});

userRouter.get('/byusername', authenticateUser, async (req, res) => {
  const { username } = req.query;

  try {
    
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error al obtener el usuario por nombre de usuario:', err);
    res
      .status(500)
      .json({ error: 'Error al obtener el usuario por nombre de usuario' });
  }
});

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout',logoutUser);

userRouter.get('/count', async (req, res) => {
  try {
    const count = await countUsers();
    res.json({ count });
  } catch (err) {
    console.error('Error al obtener el contador de usuarios:', err);
    res.status(500).json({ error: 'Error al obtener el contador de usuarios' });
  }
});

userRouter.delete('/delete', async (req, res) => {
  const { userId } = req.body;
  await deleteUserById(userId);
  res.json({ message: `User con ID ${userId} eliminado exitosamente` });
});

userRouter.get('/users-courses',authenticateUser, async (req, res) => {

  try {
    const usersWithCourses = await findUserWithCourses();
    res.json({ users: usersWithCourses });
  } catch (err) {
    console.error('Error al obtener todos los usuarios y sus cursos:', err);
    res
      .status(500)
      .json({ error: 'Error al obtener todos los usuarios y sus cursos' });
  }
});

userRouter.post('/edit', authenticateUser, async (req, res) => {  
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    gender,
    country,
    city,
    birthDate,
    id,
  } = req.body;

  const updatedUser = await updateUserById(id, {
    firstName,
    lastName,
    username,
    password,
    email,
    gender,
    country,
    city,
    birthDate,
  });

  res
    .status(200)
    .json({ message: `Usuario con ID ${id} editado exitosamente` });
});

module.exports = userRouter;
