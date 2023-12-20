/* eslint-disable security/detect-possible-timing-attacks */
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const loginService = require('../Services/login.service');
const logger = require('../config/logger');
const rescodes = require('../utility/rescodes');
const config = require('../config/vars');
const transporter = require('../utility/nodemailerTransport');
const generateAccessToken = require('../utility/generateToken');
const generateResetPasswordEmail = require('../utility/generateEmail');

const login = {};

// User login
login.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await loginService.checkUser({ email, password });

    if (!userExist) {
      res.response = {
        code: 401,
        data: { status: 'Error', message: rescodes?.noUser },
      };
      return next();
    }

    if (userExist.userStatus === 'Inactive') {
      res.response = {
        code: 404,
        data: { status: 'Error', message: rescodes?.inActiveUsr },
      };
      return next();
    }

    const isInviteValid = moment().diff(userExist.inviteDate, 'days') === 0;

    if (userExist.userStatus === 'Invited' && !isInviteValid) {
      res.response = {
        code: 404,
        data: { status: 'Error', message: rescodes?.inValid },
      };
      return next();
    }

    const depass = jwt.verify(userExist.password, config.app.accesstoken);
    if (depass.password !== password) {
      res.response = {
        code: 401,
        data: { status: 'Error', message: rescodes?.checkCred },
      };
      return next();
    }

    const user = { name: email, id: userExist.id };
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, config.app.refreshtoken);

    const { code, data } = await loginService.validatelogin({
      userId: user.id,
      token: refreshToken,
      accessToken,
      userExist,
      isInviteValid,
    });

    res.response = {
      code,
      data,
    };
    return next();
  } catch (err) {
    logger.info(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.error },
    };
    return next();
  }
};

// User forgotpassword
login.forgotPassword = async (req, res, next) => {
  try {
    const email = req?.body?.email;
    if (!email || !email.trim()) {
      res.response = {
        code: 400,
        data: { status: 'Error', message: rescodes?.reqFields },
      };
      return next();
    }
    const userExist = await loginService.findUserByEmail(email);
    if (userExist && Object.keys(userExist?.dataValues)?.length) {
      if (userExist?.dataValues?.userStatus !== 'Active') {
        res.response = {
          code: 400,
          data: { status: 'Error', message: rescodes?.Inactive },
        };
        return next();
      }

      const uuid = uuidv4();
      const passTrigger = await loginService.createPasswordChangeRequest(userExist?.dataValues?.id, uuid);
      const resetLink = `${config.app.hostname}api/v1/login/resetpassword?id=${passTrigger?.dataValues?.code}`;
      const emailBody = generateResetPasswordEmail(resetLink);

      if (passTrigger && Object.keys(passTrigger?.dataValues)?.length) {
        const mailOptions = {
          from: config.app.adminEmail,
          to: email,
          subject: 'Forgot Password',
          html: emailBody,
        };

        const result = await transporter.sendMail(mailOptions);
        if (result) {
          res.response = {
            code: 200,
            data: { status: 'Ok', message: rescodes?.mailSentF },
          };
          return next();
        }
      }
    } else {
      res.response = {
        code: 404,
        data: { status: 'Error', message: rescodes?.recordNM },
      };
      return next();
    }
    return next();
  } catch (err) {
    logger.error(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.IntSerError },
    };
    return next();
  }
};

// User resetpassword
login.resetPassword = async (req, res, next) => {
  try {
    const { resetCode, newPassword } = req?.body || {};

    if (!resetCode || !newPassword) {
      res.response = {
        code: 400,
        data: { status: 'Error', message: rescodes?.reqFields },
      };
      return next();
    }

    const checklink = await loginService.checkPasswordChangeRequest(resetCode);

    if (checklink && Object.keys(checklink?.dataValues)?.length) {
      const encryptedPassword = jwt.sign({ password: newPassword }, config.app.accesstoken);
      const updatePass = await loginService.updateUserPassword(checklink?.dataValues?.userId, encryptedPassword);
      const deleteReq = await loginService.deletePasswordChangeRequest(resetCode);

      if (deleteReq && updatePass) {
        res.response = {
          code: 200,
          data: { status: 'ok', message: rescodes?.passRS },
        };
        return next();
      }
    } else {
      await loginService.deletePasswordChangeRequest(resetCode);
      res.response = {
        code: 404,
        data: { status: 'Error', message: rescodes?.resetCode },
      };
      return next();
    }
  } catch (err) {
    logger.info(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.error },
    };
    return next();
  }
  return Promise.resolve();
};

// User generate Refresh Token
login.refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const userEmail = req.user?.email;
    const userId = req.user?.id;

    if (!token || !userEmail || !userId) {
      res.response = {
        code: 400,
        data: { status: 'Error', message: rescodes?.reqFields },
      };
      return next();
    }

    const refreshTokenUser = jwt.verify(token, config.app.refreshtoken);

    if (refreshTokenUser?.name !== userEmail || refreshTokenUser?.id !== userId || token === null) {
      res.response = {
        code: 401,
        data: { status: 'Error', message: rescodes?.invalidTok },
      };
      return next();
    }

    const existQuery = await loginService.findUserByEmailAndId(refreshTokenUser?.name, refreshTokenUser?.id);

    if (!existQuery || !Object.keys(existQuery?.dataValues)?.length) {
      res.response = {
        code: 401,
        data: { status: 'Error', message: 'Unauthorized' },
      };
      return next();
    }

    const getId = await loginService.findRefreshTokensByUserId(existQuery?.dataValues?.id);
    const result = getId.map((val) => val?.dataValues?.token);

    if (!result?.includes(token)) {
      res.response = {
        code: 403,
        data: { status: 'Error', message: rescodes?.forbidden },
      };
      return next();
    }

    const users = { name: refreshTokenUser?.name, id: refreshTokenUser?.id };
    const accessToken = generateAccessToken(users);

    res.response = {
      code: 200,
      data: { status: 'Ok', data: { accessToken, expiresIn: 3600000 } },
    };
    return next();
  } catch (err) {
    logger.info(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.error },
    };
    return next();
  }
};

// User logout
login.logout = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.response = {
        code: 400,
        data: { status: 'Error', message: rescodes?.reqFields },
      };
      return next();
    }

    const deletedRows = await loginService.deleteRefreshToken(token);

    let responseCode = 500;
    let responseData = { status: 'Error', message: rescodes?.IntSerError };

    if (deletedRows !== undefined) {
      if (deletedRows !== 0) {
        responseCode = 200;
        responseData = { status: 'Ok', message: rescodes?.logout };
      } else {
        responseCode = 400;
        responseData = { status: 'Error', message: rescodes?.tokenAldel };
      }
    }

    res.response = {
      code: responseCode,
      data: responseData,
    };
    return next();
  } catch (err) {
    logger.info(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.IntSerError },
    };
    return next();
  }
};

module.exports = login;
