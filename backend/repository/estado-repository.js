'use strict';
const mongoose = require('mongoose');
const Estado = mongoose.model('Estado');

exports.create = async (data) => {
    let estado = new Estado(data);
    await estado.save();
    return estado;
}

exports.listAll = async (page, limit, sort, text = null) => {
  const search = text != null ? { nome: { $regex: text, $options: "$i" } } : null;
  const data = await Estado.find(search).sort(sort).limit(limit * 1).skip((page - 1) * limit);
  const count = await Estado.find(search).countDocuments();
  return [data, count];
};

exports.get = async (data) => {
  const res = await Estado.findById(data);
  return res;
};

exports.delete = async (data) => {
  const res = await Estado.findByIdAndDelete(data);
  return res;
};

exports.update = async (id, data) => {
    const res = await Estado.findByIdAndUpdate(id, {
      $set: {
        nome: data.nome,
        abreviacao: data.abreviacao,
      }
    }, { new: true });
  return res;
}