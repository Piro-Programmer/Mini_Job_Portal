const Application = require('../models/Application');
const Job = require('../models/Job');

exports.getApplicationsByJob = async (req, res) => {
  try {
    const { job_id } = req.params;

    const job = await Job.findOne({ where: { id: job_id, employer_id: req.user.id } });
    if (!job) return res.status(404).json({ message: 'Job not found or unauthorized' });

    const applications = await Application.findAll({ where: { job_id } });
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByPk(id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const job = await Job.findOne({ where: { id: application.job_id, employer_id: req.user.id } });
    if (!job) return res.status(403).json({ message: 'Unauthorized' });

    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
