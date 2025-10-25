const express = require('express');
const router = express.Router();
const { getApplicationsByJob, updateApplicationStatus } = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');

router.get('/applications/:job_id', protect(['employer']), getApplicationsByJob);
router.put('/applications/:id', protect(['employer']), updateApplicationStatus);

module.exports = router;
