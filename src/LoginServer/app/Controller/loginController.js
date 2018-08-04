const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/loginModel');

exports.ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
		return next();
	else
		return res.status(500).send({
            message: 'Não autenticado'
        });
}

exports.postUser = (req, res, next) => {
    let passwordValidate = (req.body.passwordAgain === req.body.password) ? req.body.passwordAgain = req.body.passwordAgain : req.body.passwordAgain = '';

    let query = Users.find({});

    query.find((err, users) => {

        let validaUsuários;
        let validaTelefone;
        let validaEmail;
        let msgTelefone;
        let msgEmail;

        let validaForm = (users.length) ? users.forEach((userSearch) => {
            validaTelefone = (req.body.telefone == userSearch.telefone);
            validaEmail = (req.body.email == userSearch.email);
            msgTelefone = (req.body.telefone == userSearch.telefone) ? msgTelefone = 'Telefone já existente !' :  msgTelefone = '';
            msgEmail = (req.body.email == userSearch.email) ? msgEmail = 'E-mail já existente !' : msgEmail = '';
        }) : validaUsuários = false;

        let user = ((passwordValidate && validaUsuários === false) || (passwordValidate && validaEmail === false && validaTelefone === false)) ? Users.create({
            nome: req.body.nome,
            password: req.body.password,
            passwordAgain: passwordValidate,
            email: req.body.email,
            telefone: req.body.telefone,
            cover: req.body.cover
        }, (err, users) => {
            if(err)
                return res.status(500).send({ 
                    message: 'erro', 
                    erro: err
                }); 
    
            Users.createUser(users, (err, user) => {
                if(err)
                    throw err;
            }); 

            return res.status(200).send({
                message: 'Cadastrado com sucesso',
                User: users
            }); 
        }) : res.status(500).send({ message: (msgTelefone !== '') ? msgTelefone : msgEmail });
    }) 
};

passport.use(new LocalStrategy((nome, password, done) => {
    Users.getUserByUsername(nome, (err, user) => {
        if(err) throw err;
        if(!user)
            return done(null, false, {message: 'Unknown User'});
        
        Users.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch)
                return done(null, user);
            else
                return done(null, false, {message: 'Invalid password'});
        });
    });
}));
  
passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    Users.getUserById(id, (err, user) => {
        done(err, user);
    });
});

exports.getLogout = (req, res, next) => {
    req.logout();
}