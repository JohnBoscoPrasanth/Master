/* eslint-disable import/no-extraneous-dependencies */
const { Country } = require('country-state-city');
const config = require('../src/config/vars');
const key = require('../src/utility/key_conversion');

module.exports = {
  up: async (queryInterface) => {
    const countrySeederData = Country.getAllCountries().map(async (country) => {
      return {
        name: country.name,
        key: await key.convertCamelCase(country.name.trim()),
        isActive: true,
        countryCode: country.isoCode,
        latitude: country.latitude,
        longitude: country.longitude,
      };
    });

    const formattedCountryData = await Promise.all(countrySeederData);

    return queryInterface.bulkInsert(
      'country',
      formattedCountryData.map((data) => ({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { schema: config.db.schema }
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('country', null, { schema: config.db.schema });
  },
};
