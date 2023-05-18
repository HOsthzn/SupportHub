const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/accessManagement/groupsController');
const protect = require("../auth/protect");

router.get('/', protect.protectRoute, groupsController.index);
router.get('/index', protect.protectRoute, groupsController.index);

//details
router.get('/details/:id', protect.protectRoute, groupsController.details);

//create
router.get('/create', protect.protectRoute, groupsController.create.get);
router.post('/create', protect.protectRoute, groupsController.create.post);

module.exports = router;