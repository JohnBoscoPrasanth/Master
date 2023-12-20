const { Op } = require('sequelize');

const { sequelize } = require('../../models/index');
const db = require('../../models/index');
const rescodes = require('../utility/rescodes');

const loginService = {};

loginService.checkUser = async ({ email }) => {
  return db.users.findOne({
    where: {
      email,
      isTrash: false,
    },
  });
};

loginService.validatelogin = async ({ userId, token, accessToken, userExist, isInviteValid }) => {
  await db.refreshToken.create({
    userId,
    token,
  });
  return {
    code: 200,
    data: {
      status: 'Ok',
      data: {
        id: userExist.id,
        email: userExist.email,
        accessToken,
        refreshToken: token,
        userStatus: userExist.userStatus,
        isInviteValid,
        expiresIn: 3600000,
      },
      message: rescodes?.loginSuc,
    },
  };
};

loginService.findUserByEmail = async (email) => {
  return db.users.findOne({
    where: {
      email,
    },
  });
};

loginService.createPasswordChangeRequest = async (userId, code) => {
  return db.passwordChangeRequests.create({
    userId,
    code,
    tiggertime: new Date(),
  });
};

loginService.checkPasswordChangeRequest = async (resetCode) => {
  return db.passwordChangeRequests.findOne({
    where: {
      code: resetCode,
      tiggertime: {
        [Op.gt]: sequelize.literal(`NOW() - interval '24 hours'`),
      },
    },
  });
};

loginService.updateUserPassword = async (userId, newPassword) => {
  return db.users.update(
    {
      password: newPassword,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

loginService.deletePasswordChangeRequest = async (resetCode) => {
  return db.passwordChangeRequests.destroy({
    where: {
      code: resetCode,
    },
  });
};

loginService.findUserByEmailAndId = async (email, userId) => {
  return db.users.findOne({
    where: {
      email,
      id: userId,
    },
  });
};

loginService.findRefreshTokensByUserId = async (userId) => {
  return db.refreshToken.findAll({
    where: {
      userId,
    },
  });
};

loginService.deleteRefreshToken = async (token) => {
  try {
    const deletedRows = await db.refreshToken.destroy({
      where: {
        token,
      },
    });

    return deletedRows;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = loginService;
