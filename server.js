const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'School Finder';

app.get('/', (request, response) => {
  response.send('School/s in session sucka!');
});

app.get('/schools', (request, response) => {
  database('schools').select()
  .then((schools) => {
    response.status(200).json(schools)
  })
  .catch((error) => {
    response.status(404).json({error})
  });
});

app.get('/districts', (request, response) => {
  database('districts').select()
  .then((districts) => {
    response.status(200).json(districts)
  })
  .catch((error) => {
    response.status(404).json({error})
  });
});

app.get('/counties', (request, response) => {
  database('counties').select()
  .then((counties) => {
    response.status(200).json(counties)
  })
  .catch((error) => {
    response.status(404).json({error})
  });
});


//not working yet
app.get('/api/schools/:name', (request, response) => {
  database('schools').where('name', request.params.name).select()
  response.json({
    name: request.params.name
  });
});

//posts
app.post('/api/v1/schools', (request, response) => {
  const school = request.body;

  for (let requiredParameter of ['name', 'schoolCode', 'studentCount', 'teacherCount', 'studentTeacherRatio', 'districtId']) {
    if (!school[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('schools').insert(school, 'id')
    .then(school => {
      response.status(201).json({ id: school[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/districts', (request, response) => {
  const district = request.body;

  for (let requiredParameter of ['name', 'disctrictCode', 'countyId']) {
    if (!district[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('districts').insert(district, 'id')
    .then(school => {
      response.status(201).json({ id: school[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/counties', (request, response) => {
  const county = request.body;

  for (let requiredParameter of ['name', 'countyCode']) {
    if (!county[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('counties').insert(county, 'id')
    .then(school => {
      response.status(201).json({ id: school[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
