const Admin = require("../models/admin");
const bcrypt = require('bcrypt');

const findAdmin = async () => {
  return await Admin.find();
};

const findAdminByAdminName = async (name) => {
  return await Admin.findOne({ name });
};

const createAdmin = async (admin) => {
  const { name, password } = admin;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ name, password: hashedPassword });
  return await newAdmin.save();
};

const isValidAdminCredentials = async (admin) => {
  try {
    const { name, password } = admin;
    const adminFound = await Admin.findOne({ name });
    if (!adminFound) {
      return { ok: false, message: 'Credenciales inválidas' };
    }
    const passwordMatched = await bcrypt.compare(password, adminFound.password);
    if (passwordMatched) {
      return { ok: true, adminFound };
    } else {
      return { ok: false, message: 'Credenciales inválidas' };
    }
  } catch (error) {
    throw new Error('Error de autenticación');
  }
};

const countAdmin = async () => {
  return await Admin.countDocuments();
};

const deleteAdminById = async (adminId) => {
  return await Admin.findByIdAndDelete(adminId);
};

module.exports = { findAdmin, findAdminByAdminName, createAdmin, isValidAdminCredentials, countAdmin, deleteAdminById };