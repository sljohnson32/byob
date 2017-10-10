const schoolData = require('./data/BYOB_schools_data');
const countyData = require('./data/BYOB_counties_data');
const districtData = require('./data/BYOB_districts_data');

exports.seed = function(knex, Promise) {
  return knex('schools').del()
    .then(() => knex('districts').del())
    .then(() => knex('counties').del())
    .then(() => {
      return Promise.all([

      ])
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
