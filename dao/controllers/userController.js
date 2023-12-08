const User = require("../models/users")
const bcrypt = require ('bcrypt');
const moment = require("moment-timezone");


const findUser = async () => {
    return await User.find().populate('registeredCourses').select('field1 field2');
};

const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

const getUserIdByUsername = async (username) => {
    const user = await findUserByUsername(username);
    console.log('Usuario encontrado:', user);
    return user ? user._id : null;
};

const createUser = async (user) => {
    const newUser = new User(user);
    newUser.fechaInclusion = new Date();
    return await newUser.save();
};

const countUsers = async () => {
    return await User.countDocuments();
};

const isValidCredentials = async (user) => {
    const userFound = await findUserByUsername(user.username);
    if (!userFound) {
        console.log('Usuario no encontrado');
        return { ok: false, message: 'Nombre de usuario no válido' };
    }
    
    const passwordMatched = await bcrypt.compare(user.password, userFound.password);
    if (passwordMatched) {
        console.log('Contraseña coincidente');
        return { ok: true, userFound };
    } else {
        return { ok: false, message: 'Contraseña no válida' };
    }
};

const deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

const findUserById = async (userId) => {
    const user = await User.findById(userId).select('field1 field2');
    if (user) {
        user.fechaInclusion = moment.utc(user.fechaInclusion).local().toDate();
    }
    return user;
};

const updateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true }).select('field1 field2');
};

module.exports = { findUserById, findUser, findUserByUsername, createUser, isValidCredentials, countUsers, deleteUserById, getUserIdByUsername, updateUserById };
