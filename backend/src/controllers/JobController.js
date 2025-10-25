const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, location, company_name } = req.body;
    const employer_id = req.user.id;

    const job = await Job.create({ title, description, location, company_name, employer_id });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyJobs = async (req, res) => {
  try { 
    const jobs = await Job.findAll({
      where: { employer_id: req.user.id },
      order: [['created_at', 'DESC']],
    });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
