const Admin = require("../models/admin")
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const findAdmin =  async (adminNme) => {
    return await Admin.find ()
};

const findAdminByAdminName =  async (adminName) => {
    return await Admin.findOne({adminName})
};

const getAdminIdByAdminName = async (adminName) => {
    const admin = await Admin.findOne({ adminName });
    if (admin) {
      return admin._id;
    }
  };

const createAdmin = async  (admin) =>{

    const newAdmin = new Admin (admin)
    return await newAdmin.save()
};

const isValidAdminCredentials = async (admin) =>{
    try {
        const adminFound = await Admin.findOne({ adminName: admin.adminName });
        if (!adminFound) {
            console.log('Admin no encontrado');
            return { ok: false, message: 'Credenciales inválidas' };
        }
        
        const passwordMatched = await bcrypt.compare(admin.password, adminFound.password);
        if (passwordMatched) {
            return { ok: true, adminFound };
        } else {
            return { ok: false, message: 'Credenciales inválidas' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error de autenticación');
    }

};


const countAdmin =  async (admin) =>{
    return await Admin.countDocuments()
    };


    const deleteAdminById = async (adminId) => {
      return await Admin.findByIdAndDelete(adminId);
    };

    const registerAdmin = async (req, res) => {
        const {
            adminName,
            password,
            confirmPassword
        } = req.body;
      
        try {
          if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Las contraseñas no coinciden' });
          }

        const existingAdmin = await findAdminByAdminName(adminName);
          if (existingAdmin) {
              return res.status(400).json({ error: 'El administrador ya existe' });
          }
      
          let hashedPassword = await bcrypt.hash(password, 10);

          await createAdmin({
            adminName,
            password: hashedPassword,
          });
      
          res.json({ message: 'Administrador registrado exitosamente' });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al registrar administrador' });
        }
      };

    const loginAdmin = async (req, res) => {
        const { adminName, password } = req.body;
      
        try {
          const result = await isValidAdminCredentials({ adminName, password });
      
          if (result.ok) {
            const adminId = await getAdminIdByAdminName(adminName);
            const adminToken = jwt.sign({ adminId, adminName, password }, TOKEN_SECRET, { expiresIn: '7d' });
            res.json({ message: 'Logeado correctamente', adminToken, adminId });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          res.status(401).json({ error: error.message });
        }
      };

module.exports = { findAdmin, findAdminByAdminName, createAdmin, isValidAdminCredentials, countAdmin, deleteAdminById, loginAdmin, registerAdmin }