const express = require('express');
const router = express.Router();
const IssuesController = require('../controllers/issuesController');
const protect = require('../auth/protect');

router.get('/',protect.protectRoute, IssuesController.index);
router.get('/index',protect.protectRoute, IssuesController.index);

module.exports = router;