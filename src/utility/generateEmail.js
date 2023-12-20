const resetPasswordTemplate = require('./resetPasswordTemplate');

const generateResetPasswordEmail = (resetLink) => {
  return resetPasswordTemplate(resetLink);
};

module.exports = generateResetPasswordEmail;
