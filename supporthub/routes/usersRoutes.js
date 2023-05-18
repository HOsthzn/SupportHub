const express = require('express');
const router = express.Router();
const usersController = require('../controllers/accessManagement/usersController');
const protect = require("../auth/protect");

router.get('/', protect.protectRoute, usersController.index);
router.get('/index', protect.protectRoute, usersController.index);

//details
router.get('/details/:id', protect.protectRoute, usersController.details);

//create
router.get('/create', protect.protectRoute, usersController.create.get);
router.post('/create', protect.protectRoute, usersController.create.post);

module.exports = router;
