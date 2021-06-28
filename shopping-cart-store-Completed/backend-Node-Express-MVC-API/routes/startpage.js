const express = require('express');
const router = express.Router();

const startPageController = require('../controllers/startpage');

router.get('/', startPageController.loadAllProducts);

module.exports = router; 