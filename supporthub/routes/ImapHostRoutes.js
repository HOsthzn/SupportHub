const express = require('express');
const router = express.Router();
const ImapHostController = require('../controllers/ImapHostController');
const protect = require('../auth/protect');


router.get('/', protect.protectRoute, ImapHostController.index);
router.get('/index', protect.protectRoute, ImapHostController.index);

router.get('/details/:id', protect.protectRoute, ImapHostController.details);

//create
router.get('/create', protect.protectRoute, ImapHostController.create.get);
router.post('/create', protect.protectRoute, ImapHostController.create.post);

//edit
router.get('/edit/:id', protect.protectRoute, ImapHostController.edit.get);
router.post('/edit', protect.protectRoute, ImapHostController.edit.post);

//delete
router.get('/delete/:id', protect.protectRoute, ImapHostController.delete.get);
router.post('/delete', protect.protectRoute, ImapHostController.delete.post);

module.exports = router;