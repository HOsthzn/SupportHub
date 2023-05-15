const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const protect = require('../auth/protect');

router.get('/', protect.protectRoute, ProjectController.index);
router.get('/index', protect.protectRoute, ProjectController.index);

router.get('/details/:id', protect.protectRoute, ProjectController.details);

//create
router.get('/create', protect.protectRoute, ProjectController.create.get);
router.post('/create', protect.protectRoute, ProjectController.create.post);

//edit
router.get('/edit/:id', protect.protectRoute, ProjectController.edit.get);
router.post('/edit', protect.protectRoute, ProjectController.edit.post);

//delete
router.get('/delete/:id', protect.protectRoute, ProjectController.delete.get);
router.post('/delete', protect.protectRoute, ProjectController.delete.post);

module.exports = router;
