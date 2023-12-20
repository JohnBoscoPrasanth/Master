const nodemailer = require('nodemailer');
const config = require('../config/vars');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.app.adminEmail,
    pass: config.app.adminPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
