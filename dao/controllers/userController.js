const User = require('../models/users');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');

const findUser = async (username) => {
  return await User.find().populate('registeredCourses');
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const getUserIdByUsername = async (username) => {
  const user = await User.findOne({ username });
  console.log('Usuario encontrado:', user);
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

module.exports = {
  findUserById,
  findUser,
  findUserByUsername,
  createUser,
  isValidCredentials,
  countUsers,
  deleteUserById,
  getUserIdByUsername,
  updateUserById,
};
