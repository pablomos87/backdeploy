const express = require('express');
const userRouter = express.Router();
const { findUser, isValidCredentials, createUser, findUserByUsername, deleteUserById, countUsers, getUserIdByUsername, updateUserById  } = require('../dao/controllers/userController');
const bcrypt = require ('bcrypt');


userRouter.get('/', async (req, res) => {
  try {
    const allUsers = await findUser();
    res.json({ users: allUsers });
    
  } catch (err) {
    console.error('Error al obtener todos los usuarios:', err);
    res.status(500).json({ error: 'Error al obtener todos los usuarios' });
  }
});

userRouter.get('/byusername', async (req, res) => {
  const { username } = req.query;
  
  try {
    if (!username) {
      return res.status(400).json({ error: 'Se requiere un nombre de usuario' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (err) {
    console.error('Error al obtener el usuario por nombre de usuario:', err);
    res.status(500).json({ error: 'Error al obtener el usuario por nombre de usuario' });
  }
});

userRouter.post('/register', async (req, res) => {
  const {
      username,
      password,
      confirmPassword,
      email,
      confirmEmail,
      gender,
      country,
      city,
      firstName,
      fechaInclusion,
      lastName,
      birthDate
  } = req.body;

  try {
      
      if (password !== confirmPassword) {
          return res.status(400).json({ error: 'Las contraseñas no coinciden' });
      }


      if (email !== confirmEmail) {
          return res.status(400).json({ error: 'Los correos electrónicos no coinciden' });
      }

      const existingUser = await findUserByUsername(username);
      if (existingUser) {
          return res.status(400).json({ error: 'El usuario ya existe' });
      }

      let hashedPassword = await bcrypt.hash(password, 10);
      let hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

      await createUser({
          username,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
          email,
          confirmEmail,
          gender,
          country,
          city,
          firstName,
          fechaInclusion,
          lastName,
          birthDate
      }, res);
      res.json({ message: 'Registrado exitosamente' })
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al registrar usuario' });
  }  
});


userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  
  try {
    const result = await isValidCredentials(user);
    if (result.ok) {
      const userId = await getUserIdByUsername(username);
      req.session.user = username
      res.cookie('userSession', JSON.stringify(user), {
        /* httpOnly: true, */
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      console.log('Sesión establecida:', req.session.user);
      console.log('Configuración de la cookie userSession:', res.getHeaders()['set-cookie']);
      res.json({ message: 'Logeado correctamente', userId }); 
    } else {
      res.status(401).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

userRouter.get('/user/info', (req, res) => {
  if (req.session.user) {
    
    res.json({ username: req.session.user });
  } else {
    
    res.status(401).json({ error: 'No autenticado' });
  }
});

userRouter.post('/logout', (req, res) => {
  if (req.cookies.userSession) {
    res.clearCookie('userSession');
    res.json({ message: 'Sesión cerrada exitosamente' });
  } else {
    res.status(401).json({ error: 'No hay sesión activa' });
  }
});

userRouter.delete('/delete', async (req, res) => {
  const {userId} = req.body;
  await deleteUserById(userId)
  res.json({ message: `Usuario con ID ${userId} eliminado exitosamente` });
});


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
  const {userId} = req.body;
  await deleteUserById(userId)
  res.json({ message: `User con ID ${userId} eliminado exitosamente` });
});

userRouter.get('/users-courses', async (req, res) => {
  try {
      const usersWithCourses = await findUserWithCourses();
      res.json({ users: usersWithCourses });
  } catch (err) {
      console.error('Error al obtener todos los usuarios y sus cursos:', err);
      res.status(500).json({ error: 'Error al obtener todos los usuarios y sus cursos' });
  }
});

userRouter.post('/edit', async (req, res) =>{
  const {firstName, lastName, username, password ,email, gender, country, city, birthDate, id} = req.body

  const updatedUser = await updateUserById (id, {firstName, lastName, username, password ,email, gender, country, city, birthDate})

  res.status(200).json({message: `Usuario con ID ${id} editado exitosamente`})
});


module.exports = userRouter;
