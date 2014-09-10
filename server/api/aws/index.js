'use strict';

var express = require('express');
var controller = require('./aws.controller');

var router = express.Router();

router.get('/s3policy', controller.getS3Policy);
router.get('/config', controller.getConfig);

module.exports = router;