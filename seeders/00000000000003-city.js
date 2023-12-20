/* eslint-disable import/no-extraneous-dependencies */
const { City } = require('country-state-city');
const config = require('../src/config/vars');
const key = require('../src/utility/key_conversion');
const values = require('../src/utility/getValues');

module.exports = {
  up: async (queryInterface) => {
    const citySeederData = City.getAllCities().map(async (city) => {
      return {
        name: city.name,
        key: await key.convertCamelCase(city.name.trim()),
        stateId: await values.state(city.stateCode),
        isActive: true,
        latitude: city.latitude,
        longitude: city.longitude,
      };
    });

    const formattedCityData = await Promise.all(citySeederData);

    return queryInterface.bulkInsert(
      'city',
      formattedCityData.map((data) => ({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { schema: config.db.schema }
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('city', null, { schema: config.db.schema });
  },
};
