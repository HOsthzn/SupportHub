const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const protect = require('../auth/protect');

router.get('/', protect.protectRoute, ticketController.index);
router.get('/index', protect.protectRoute, ticketController.index);

router.get('/details/:id', ticketController.details);

//create
router.get('/create', protect.protectRoute, ticketController.create.get);
router.post('/create', protect.protectRoute, ticketController.create.post);

//edit
router.get('/edit/:id', protect.protectRoute, ticketController.edit.get);
router.post('/edit', protect.protectRoute, ticketController.edit.post);

//delete
router.get('/delete/:id', protect.protectRoute, ticketController.delete.get);
router.post('/delete', protect.protectRoute, ticketController.delete.post);

module.exports = router;
