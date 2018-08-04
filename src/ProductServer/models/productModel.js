const mongoose = require('mongoose');

//Schema, modelo de como vou mandar os dados para o banco. instanciando esse esquema, para dentro da variavel.
var ProdutosSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'informe o nome do Produto']
    },
    quantidade: {
        type: Number,
        required: [true, 'informe a quantidade do Produto']
    },
    valor: {
        type: Number,
        required: [true, 'informe o valor do Produto']
    },
    marca: {
        type: String,
        required: [true, 'informe a marca do Produto']
    },
    cover: {
        type: String,
        require: [true, 'informe o cover do Produto']
    }
}, {
    timestamps: true
    //esse modelo pode usado, exportado no caso.
});

//nome da tabela primeiro parametro, segundo parametro nossa variavel que esta contendo nosso modelo.
module.exports = mongoose.model('Produto', ProdutosSchema);