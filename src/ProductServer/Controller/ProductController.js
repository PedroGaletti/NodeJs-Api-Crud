const mongoose = require('mongoose'); // importa o mongoose para fazer a regra de negócio pro mongo.
const Produto = require('../models/productModel'); //importando o modelo 

exports.post = (req, res, next) => {
    Produto.create({
        nome: req.body.nome, // pega a variavel do corpo nome. ou seja a variavel name, tem que ser pega pelo caminho passado para a variavel receber.
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        marca: req.body.marca,
        cover: req.body.cover
    }, (err, produtos) => {
        if(err)
            return res.status(500).send({ 
                message: 'Erro ao criar Produto', 
                erro: err
            }); //status cabeçalho da página, da requisição. 

        return res.status(200).send({
            message: 'Produto criado com sucesso',
            Produto: produtos
        });
    });    
};

exports.getAll = (req, res, next) => {
    var query = Produto.find();

    query.exec( (err, produtos) => {
        if(err)
            return res.status(500).send({
                message: 'Erro ao adquirir todos os produtos',
                erro: err
            });

        return res.status(200).json(produtos);
    });
}

exports.getOne = (req, res, next) => {
    const _idProduct = req.params.id_product;

    Produto.findById(_idProduct, (err, produto) => {
        if(err)
            return res.status(500).send({
                message: 'Erro ao adquirir único produto',
                erro: err
            });
        
        return res.status(200).send(produto);
    });
}

exports.deleteOne = (req, res, next) => {
    const _idProduct = req.params.id_product;

    Produto.findById(_idProduct, (err) => {
        if(err)
            return res.status(500).send({
                message: 'Erro ao adquirir único produto',
                erro: err
            });
        
        Produto.remove({ _id: _idProduct }, (err) => {
            if(err)
                return res.status(500).send({
                    message: 'Erro ao excluir o produto',
                    erro: err
                });
            
            return res.status(200).send({
                message: 'Produto excluido com sucesso!'
            });
        })
    })
}

exports.put = (req, res, next) => {
    const _idProduct = req.params.id_product;
    const _nome = req.body.nome;
    const _quantidade = req.body.quantidade;
    const _valor = req.body.valor;
    const _marca = req.body.marca;
    const _cover = req.body.cover;

    Produto.findById({ _id: _idProduct }, (err, produto) => {
        if(err)
            return res.status(500).send({
                message: 'Erro ao adquirir único produto',
                erro: err
            });
        produto.set({
            nome: _nome,
            quantidade: _quantidade,
            valor: _valor,
            marca: _marca,
            cover: _cover
        });

        produto.save((err, produtoAlterado) => {
            if(err)
                return res.status(500).send({
                    message: 'Erro ao alterar',
                    erro: err
                });
            return res.status(200).send({
                message: 'Produto alterado com sucesso',
                Produto: produtoAlterado
            });
        })
    });
}