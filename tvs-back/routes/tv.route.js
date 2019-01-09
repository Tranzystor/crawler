const express = require('express');
const router = express.Router();

const tvController = require('../controllers/tv.controller');

router.get('/all', tvController.getTvs);

module.exports = router;
