const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projectsController');
const protect = require('../auth/protect');

router.get('/', protect.protectRoute, ProjectsController.index);
router.get('/index', protect.protectRoute, ProjectsController.index);

module.exports = router;