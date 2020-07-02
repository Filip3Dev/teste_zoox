'use strict'

const ValidationContract = require('../validator/validator');
const repository = require('../repository/estado-repository');
const HttpStatus = require('http-status-codes');
const CacheService = require('../services/cache');
const ttl = 60 * 1;
const cache = new CacheService(ttl); 

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    const { nome, abreviacao } = req.body;

    contract.isRequired(nome, 'Onde está o nome do Estado?');
    contract.isRequired(abreviacao, 'Onde está a abreviação do Estado?');

    if (!contract.isValid()) {
        res.status(HttpStatus.BAD_REQUEST).send(contract.errors()).end();
        return 0;
    }

    try {
        const payload = {
            nome,
            abreviacao,
        }
        const retorno = await repository.create(payload);
        res.status(HttpStatus.CREATED).send({
            message: 'Estado cadastrado com sucesso!',
            data: retorno,
        });
        return 0;
    } catch (error) {
        console.log(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao cadastrar o Estado',
            erro: error
        });
    }
}

exports.put = async (req, res, next) => {
    let contract = new ValidationContract();
    const { nome, abreviacao } = req.body;

    contract.isRequired(nome, 'Onde está o nome do Estado?');
    contract.isRequired(abreviacao, 'Onde está a abreviação do Estado?');

    if (!contract.isValid()) {
        res.status(HttpStatus.BAD_REQUEST).send(contract.errors()).end();
        return 0;
    }

    try {
        const retorno = await repository.update(req.params.id, { nome, abreviacao });
        res.status(HttpStatus.OK).send({
            message: 'Estado atualizado com sucesso!',
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
        let data = await repository.listAll(page, limit, sort, textSearch);
        await cache.set(key, data);
        const payload = { data: data[0], page, limit, total: data[1] };
        res.status(HttpStatus.OK).send(payload);
    } catch (e) {
        console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};