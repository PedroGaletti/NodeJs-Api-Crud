const express = require('express');
const produtoController = require('../Controller/ProductController');

module.exports = (app) => {

    const produtoRoute = express.Router();
    //pega a rota, injeta uma rota. 

    //'api' seria o caminho de: "localhost:8080/api", e a função após "/api", é para ver se funcionou.
    app.use('/api', (req, res) => {
        res.writeHead(200); //cabeçalho tipo 200
        res.end('API FUNCIOUNOU COM SUCESSO');
    });

    app.use('/produto', 
        produtoRoute.post('/', produtoController.post),
        produtoRoute.get('/', produtoController.getAll),
        produtoRoute.get('/:id_product', produtoController.getOne),
        produtoRoute.delete('/:id_product', produtoController.deleteOne),
        produtoRoute.put('/:id_product', produtoController.put)
    );
    
}