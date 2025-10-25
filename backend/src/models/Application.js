const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Job = require('./Job');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  job_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  seeker_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Applied', 'Reviewed', 'Hired'),
    defaultValue: 'Applied',
  },
}, {
  timestamps: true,
});

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

module.exports = Application;
