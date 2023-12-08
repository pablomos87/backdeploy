const Admin = require("../models/admin")
const bcrypt = require ('bcrypt');

const findAdmin =  async (name) => {
    return await Admin.find ()
};


const findAdminByAdminName =  async (name) => {
    return await Admin.findOne({name})
};

const createAdmin = async  (admin) =>{

    const newAdmin = new Admin (admin)
    return await newAdmin.save()
};


const isValidAdminCredentials = async (admin) =>{
    try {
        const adminFound = await Admin.findOne({ name: admin.name });
        if (!adminFound) {
            console.log('Admin no encontrado');
            return { ok: false, message: 'Credenciales inválidas' };
        }
        
        const passwordMatched = await bcrypt.compare(admin.password, adminFound.password);
        if (passwordMatched) {
            console.log('Contraseña coincidente');
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
        return await Admin.findByIdAndDelete(adminId)
    };
    

module.exports = { findAdmin, findAdminByAdminName, createAdmin, isValidAdminCredentials, countAdmin, deleteAdminById }