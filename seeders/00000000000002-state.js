/* eslint-disable import/no-extraneous-dependencies */
const { State } = require('country-state-city');
const config = require('../src/config/vars');
const key = require('../src/utility/key_conversion');
const values = require('../src/utility/getValues');

module.exports = {
  up: async (queryInterface) => {
    const stateSeederData = State.getAllStates().map(async (state) => {
      return {
        name: state.name,
        key: await key.convertCamelCase(state.name.trim()),
        isActive: true,
        countryId: await values.country(state.countryCode),
        stateCode: state.isoCode,
        latitude: state.latitude,
        longitude: state.longitude,
      };
    });

    const formattedStateData = await Promise.all(stateSeederData);

    return queryInterface.bulkInsert(
      'state',
      formattedStateData.map((data) => ({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { schema: config.db.schema }
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('state', null, { schema: config.db.schema });
  },
};
