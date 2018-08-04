const express = require('express');
const User = require('../models/loginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const router = express.Router();

router.post('/register', async (req, res) => {

    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(500).send({ message: 'E-mail já em uso !' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user, token: generateToken({ id: user.id }) }); 
    } catch (err) {
        return res.status(400).send({ error: 'Registro inválido' });
    }
});

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 864000,
    });
}

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(500).send({ message: 'Usuário não encontrado '});

    if(!await bcrypt.compare(password, user.password))
        return res.status(500).send({ message: 'Senha Inválida !'});

    user.password = undefined;
    
    res.send({
        message: 'Login Efetuado !',
        user, 
        token: generateToken({ id: user.id })
     });

});

module.exports = app => app.use('/auth', router);