'use strict';
const mongoose = require('mongoose');
const Cidade = mongoose.model('Cidade');

exports.create = async (data) => {
    let cidade = new Cidade(data);
    await cidade.save();
    return cidade;
}

exports.listAll = async (page, limit, sort, text = null) => {
  const search = text != null ? { nome: { $regex: text, $options: "$i" } } : null;
  const res = await Cidade.find(search).sort(sort).limit(limit * 1).skip((page - 1) * limit).populate('estadoId');
  const count = await Cidade.find(search).countDocuments();
  return [res, count];
};

exports.get = async (data) => {
  const res = await Cidade.findById(data);
  return res;
};

exports.delete = async (data) => {
  const res = await Cidade.findByIdAndDelete(data);
  return res;
};

exports.update = async (id, data) => {
    const res = await Cidade.findByIdAndUpdate(id, {
      $set: {
        nome: data.nome,
        estadoId: data.estadoID,
      }
    }, { new: true });
  return res;
}