const jwt = require('jsonwebtoken');
const config = require('../src/config/vars');

module.exports = {
  up: (queryInterface) => {
    const encryptedPassword = jwt.sign(
      {
        password: 'SmartWork@123',
      },
      config.app.accesstoken
    );
    return queryInterface.bulkInsert(
      { tableName: 'users', schema: config.db.schema },
      [
        {
          firstName: 'Fernandus',
          lastName: 'Moris',
          jobTitle: 'VP',
          email: 'fernandus@twilightsoftwares.com',
          mobile: '1234567890',
          password: encryptedPassword,
          userName: 'fernandus.moris',
          cityId: 1,
          stateId: 2002,
          countryId: 101,
          bio: 'Here is my Bio',
          companyName: 'Twilight IT Solutions',
          userStatus: 'Active',
          isTrash: false,
        },
        {
          firstName: 'John Bosco',
          lastName: 'Prasanth',
          jobTitle: 'Backend developer',
          email: 'johnbosco.george@twilightsoftwares.com',
          mobile: '9944414515',
          password: encryptedPassword,
          userName: 'prasi2107',
          cityId: 1,
          stateId: 2002,
          countryId: 101,
          bio: 'Here is my Bio',
          companyName: 'Twilight IT Solutions',
          userStatus: 'Active',
          isTrash: false,
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete({ tableName: 'users', schema: config.db.schema }, null, {});
  },
};
