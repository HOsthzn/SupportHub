const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const protect = require('../auth/protect');

router.get('/', protect.protectRoute, homeController.index);

module.exports = router;