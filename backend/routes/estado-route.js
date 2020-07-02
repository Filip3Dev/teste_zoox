'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/estado-controler');
const authService = require('../services/auth');

router.get('/', controller.list);
router.post('/', controller.post);
router.get('/:id', controller.get);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;