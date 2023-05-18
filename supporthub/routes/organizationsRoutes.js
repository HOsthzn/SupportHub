const express = require('express');
const router = express.Router();
const organizationsController = require('../controllers/accessManagement/organizationsController');
const protect = require("../auth/protect");

router.get('/', protect.protectRoute, organizationsController.index);
router.get('/index', protect.protectRoute, organizationsController.index);

//details
router.get('/details/:id', protect.protectRoute, organizationsController.details);

//create
router.get('/create', protect.protectRoute, organizationsController.create.get);
router.post('/create', protect.protectRoute, organizationsController.create.post);

module.exports = router;