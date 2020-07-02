const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  abreviacao: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Estado', EstadoSchema);