const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const forgotpassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetpassword = {
  body: Joi.object().keys({
    resetCode: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  login,
  forgotpassword,
  resetpassword,
  logout,
};
