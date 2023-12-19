const User = require('../models/users');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET

const findUser = async (username) => {
  return await User.find().populate('registeredCourses');
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.find().populate('registeredCourses');
    return allUsers;
  } catch (err) {
    throw new Error('Error al obtener todos los usuarios');
  }
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const getUserIdByUsername = async (username) => {
  const user = await User.findOne({ username });
  if (user) {
    return user._id;
  }
};

const createUser = async (user) => {
  const newUser = new User(user);
  newUser.fechaInclusion = new Date();
  return await newUser.save();
};

const countUsers = async (user) => {
  return await User.countDocuments();
};

const isValidCredentials = async (user) => {
  try {
    const userFound = await User.findOne({ username: user.username });
    if (!userFound) {
      console.log('Usuario no encontrado');
      return { ok: false, message: 'Credenciales inválidas' };
    }

    const passwordMatched = await bcrypt.compare(
      user.password,
      userFound.password
    );
    if (passwordMatched) {
      console.log('Contraseña coincidente');
      return { ok: true, userFound };
    } else {
      return { ok: false, message: 'Credenciales inválidas' };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error de autenticación');
  }
};

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    user.fechaInclusion = moment.utc(user.fechaInclusion).local().toDate();
  }
  return user;
};

const updateUserById = async (
  id,
  {
    firstName,
    lastName,
    username,
    password,
    email,
    gender,
    country,
    city,
    birthDate,
  }
) => {
  return await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      username,
      password,
      email,
      gender,
      country,
      city,
      birthDate,
    },
    { new: true }
  );
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await isValidCredentials({ username, password });

    if (result.ok) {
      const userId = await getUserIdByUsername(username);
      const userToken = jwt.sign({ userId, username, password }, TOKEN_SECRET, { expiresIn: '7d' });
      res.json({ message: 'Logeado correctamente', userToken, userId });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
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
    birthDate,
  } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    if (email !== confirmEmail) {
      return res
        .status(400)
        .json({ error: 'Los correos electrónicos no coinciden' });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      email,
      gender,
      country,
      city,
      firstName,
      fechaInclusion,
      lastName,
      birthDate,
    };

    await createUser(newUser);
    res.json({ message: 'Registrado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

module.exports = {
  findUserById,
  findUser,
  findUserByUsername,
  countUsers,
  deleteUserById,
  getUserIdByUsername,
  updateUserById,
  loginUser,
  registerUser,
  getAllUsers,
};
