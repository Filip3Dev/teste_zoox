const mongoose = require('mongoose');

const CidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    estadoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estado",
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Cidade', CidadeSchema);