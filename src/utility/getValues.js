/* eslint-disable no-unsafe-optional-chaining */
const getValues = {};
const db = require('../../models/index');

getValues.country = async (postData) => {
  const getCountry = await db.country.findOne({
    where: {
      countryCode: postData,
      isActive: true,
    },
  });
  return getCountry.id;
};
getValues.state = async (postData) => {
  const getCountry = await db.state.findOne({
    where: {
      stateCode: postData,
      isActive: true,
    },
  });
  return getCountry.id;
};

module.exports = getValues;
