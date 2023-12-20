const Joi = require('joi');

const update = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().allow('').optional(),
    lastName: Joi.string().allow('').optional(),
    dob: Joi.date().max('now').iso().allow('').optional(),
    gender: Joi.string().valid('Male', 'Female', 'Prefer not to say').optional(),
    street1: Joi.string().allow('').optional(),
    street2: Joi.string().allow('').optional(),
    pincode: Joi.string()
      .length(6)
      .pattern(/^[0-9]+$/)
      .message('Invalid Pincode')
      .optional(),
    country: Joi.string().allow('').optional(),
    state: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    email: Joi.string().required(),
    mobile: Joi.string()
      .allow('')
      .pattern(/^[0-9]{10}$/)
      .optional(),
  }),
};

const getusername = {
  body: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  }),
};

const create = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().allow('').optional(),
    jobTitle: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().allow('').optional().min(10).max(10).pattern(/^\d+$/),
    modules: Joi.array()
      .items(
        Joi.object({
          // moduleKey: Joi.string().required(),
          moduleKey: Joi.string().optional(),
          roleKey: Joi.string().allow('').optional(),
        }).optional()
      )
      .optional(),
  }),
};

const emailexist = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const edit = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().allow('').optional(),
    jobTitle: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().allow('').optional().min(10).max(10).pattern(/^\d+$/),
    modules: Joi.array()
      .items(
        Joi.object({
          moduleKey: Joi.string().required(),
          roleKey: Joi.string().allow('').optional(),
        }).optional()
      )
      .optional(),
  }),
};

const deleteUser = {
  body: Joi.object().keys({
    userName: Joi.array().required(),
  }),
};

const updatenameandpass = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    newUserName: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

const updatestatus = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive').required(),
  }),
};

const resendlink = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
  }),
};

const getuserdetails = {
  body: Joi.object().keys({
    userName: Joi.string().optional().allow(''),
  }),
};

const changeadmin = {
  body: Joi.object().keys({
    currentAdmin: Joi.string().required(),
    newAdmin: Joi.string().required(),
    adminPassword: Joi.string().required(),
  }),
};

const usernameexist = {
  body: Joi.object().keys({
    userName: Joi.string().required(),
  }),
};

const adminemailexist = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    firmId: Joi.number().integer().required(),
  }),
};

module.exports = {
  create,
  update,
  getusername,
  emailexist,
  edit,
  deleteUser,
  updatenameandpass,
  updatestatus,
  resendlink,
  getuserdetails,
  changeadmin,
  usernameexist,
  adminemailexist,
};
