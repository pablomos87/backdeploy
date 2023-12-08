const express = require('express');
const registerRouter = express.Router();
const {  createUser, findUserByUsername } = require('../dao/controllers/userController');
const bcrypt = require ('bcrypt');



  registerRouter.post('/', async (req, res) => {
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
            lastName,
            birthDate
        }, res);
        res.json({ message: 'Registrado exitosamente' })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
    }  
});


module.exports = registerRouter;