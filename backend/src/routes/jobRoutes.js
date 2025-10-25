const express = require('express');
const router = express.Router();
const { createJob, getMyJobs } = require('../controllers/JobController');
const { protect } = require('../middleware/auth');

router.post('/', protect(['employer']), createJob);
router.get('/employer', protect(['employer']), getMyJobs);

module.exports = router;
