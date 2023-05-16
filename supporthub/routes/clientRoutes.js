const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const protect = require('../auth/protect');

router.get('/', protect.protectRoute, ClientController.index);
router.get('/index', protect.protectRoute, ClientController.index);

router.get('/details/:id', protect.protectRoute, ClientController.details);

//create
router.get('/create', protect.protectRoute, ClientController.create.get);
router.post('/create', protect.protectRoute, ClientController.create.post);

//edit
router.get('/edit/:id', protect.protectRoute, ClientController.edit.get);
router.post('/edit', protect.protectRoute, ClientController.edit.post);

//delete
router.get('/delete/:id', protect.protectRoute, ClientController.delete.get);
router.post('/delete', protect.protectRoute, ClientController.delete.post);

//get all clients
router.get('/all', protect.protectRoute, ClientController.get);

module.exports = router;