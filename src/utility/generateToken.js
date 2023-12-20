const jwt = require('jsonwebtoken');
const config = require('../config/vars');

function generateAccessToken(user) {
  return jwt.sign(user, config.app.accesstoken, { expiresIn: '60m' });
}

module.exports = generateAccessToken;
