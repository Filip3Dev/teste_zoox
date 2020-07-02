'use strict'

const ValidationContract = require('../validator/validator');
const repository = require('../repository/cidade-repository');
const HttpStatus = require('http-status-codes');
const CacheService = require('../services/cache');
const ttl = 60 * 1;
const cache = new CacheService(ttl); 

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    const { nome, estadoId } = req.body;

    contract.isRequired(nome, 'Onde está o nome da cidade?');
    contract.isRequired(estadoId, 'Onde está o ID do estado?');

    if (!contract.isValid()) {
        res.status(HttpStatus.BAD_REQUEST).send(contract.errors()).end();
        return
    }

    try {
        const payload = { nome, estadoId };
        const retorno = await repository.create(payload);
        res.status(HttpStatus.CREATED).send({
            message: 'Cidade cadastrada com sucesso!',
            data: retorno,
        });
        return 0;
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.BAD_REQUEST).send({
            message: 'Falha ao cadastrar a cidade!',
            erro: error
        });
    }
}

exports.put = async (req, res, next) => {
    let contract = new ValidationContract();
    const { nome, estadoID } = req.body;

    contract.isRequired(nome, 'Onde está o nome da Cidade?');
    contract.isRequired(estadoID, 'Onde está o ID do Estado?');

    if (!contract.isValid()) {
        res.status(HttpStatus.BAD_REQUEST).send(contract.errors()).end();
        return 0;
    }
    try {
        const retorno = await repository.update(req.params.id, req.body);
        res.status(HttpStatus.OK).send({
            message: 'Atualizado com sucesso!',
            data: retorno
        });
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        const retorno = await repository.get(req.params.id);
        res.status(HttpStatus.OK).send(retorno);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        const retorno = await repository.delete(req.params.id);
        res.status(HttpStatus.OK).send(retorno);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.list = async (req, res, next) => {
    try {
        const sort = {};
        let { page = 1, limit = 10, sortBy = null, orderBy = null, textSearch = null } = req.query;
        sort[sortBy] = orderBy === 'desc' ? -1 : 1;
        let key = `${page}-${limit}-${sortBy}-${orderBy}-${textSearch}`;
        let cache_req = await cache.get(key);
        if (cache_req) {
            const payload = { data: cache_req[0], page, limit, total: cache_req[1] };
            res.status(HttpStatus.OK).send(payload);
            return 0;
        }
        const retorno = await repository.listAll(page, limit, sort, textSearch);
        await cache.set(key, retorno);
        const payload = { data: retorno[0], page, limit, total: retorno[1] };
        res.status(HttpStatus.OK).send(payload);
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};