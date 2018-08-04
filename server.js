const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const mongo = require('mongodb');

dotenv.load({
    path: '.env'
});

const app = express();
const server = require('http').Server(app);

app.use(compression());
app.use(logger('dev'));
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(errorHandler());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGODB_URI, {  useMongoClient: true});
mongoose.connection.on('error', (err) => {
    console.log('Falha ao conectar com o Banco!');
    process.exit(1);
})
mongoose.Promise = global.Promise;

// const routerProduct = require('./src/ProductServer/routes/api');
const controllerAuth = require('./src/LoginServer/app/Controller/authController')(app);
const projectsAuth = require('./src/LoginServer/app/Controller/projectController')(app);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), () => {
    console.log('Servidor esta rodando na porta: ' + app.get('port') + app.get('env'));
});

module.exports = app;

//controller, faz a regra de negócio.
//server cria, instancia o servidor.
//.env passa a porta e o caminho que conectamos ao banco.
//routes .. api para que pegamos o caminho de nossas rotas, ou criemos nossas rotas.
//models, armazena os nossos modelos e esquemas, que iremos passar os dados para o banco. 