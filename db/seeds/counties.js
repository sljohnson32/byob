const schoolData = require('../../data/BYOB_schools_data');
const countyData = require('../../data/BYOB_counties_data');
const districtData = require('../../data/BYOB_districts_data');

const createCounty = (knex, county) => {
  return knex('counties').insert({
    name: county.name,
    county_code: county.code
  }, 'id')
  .then(countyID => {
    let districtPromises = [];

    let districts = districtData.filter(obj => {
      return obj.county_code == county.code
    });

    districts.forEach(district => {
      district.county_id = countyID;
      districtPromises.push(createDistrict(knex, district))
    });

    return Promise.all(districtPromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};

const createDistrict = (knex, district) => {
  return knex('districts').insert({
    name: district.district_name,
    district_code: district.district_code,
    county_id: district.county_id
  }, 'id')
  .then(districtID => {
    let schoolPromises = [];

    let schools = schoolData.filter(obj => {
      return obj.district_code == districtID
    });

    schools.forEach(school => {
      school.district_id = districtID;
      schoolPromises.push(createSchool(knex, school));
    });

    return Promise.all(schoolPromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};

const createSchool = (knex, school) => {
  return knex('schools').insert({
    name: school.school_name,
    school_code: school.school_code,
    student_count: school.student_count,
    teacher_count: school.teacher_count,
    student_teacher_ratio: school.pupil_teacher_ratio,
    district_id: school.district_id,
  })
};

exports.seed = function(knex, Promise) {
  return knex('schools').del()
    .then(() => knex('districts').del())
    .then(() => knex('counties').del())
    .then(() => {
      let countiesPromises = [];

      countyData.forEach(county => {
        countiesPromises.push(createCounty(knex, county));
      });

      return Promise.all(countiesPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
