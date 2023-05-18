const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/accessManagement/rolesController');
const protect = require("../auth/protect");

router.get('/', protect.protectRoute, rolesController.index);
router.get('/index', protect.protectRoute, rolesController.index);

//details
router.get('/details/:id', protect.protectRoute, rolesController.details);

//create
router.get('/create', protect.protectRoute, rolesController.create.get);
router.post('/create', protect.protectRoute, rolesController.create.post);

//update
router.post('/update/', protect.protectRoute, rolesController.update);
router.post('/updatePermissions/', protect.protectRoute, rolesController.updatePermissions);

module.exports = router;