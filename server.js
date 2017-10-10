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

app.get('/api/v1/schools', (request, response) => {
  database('schools').select()
  .then((schools) => {
    response.status(200).json(schools)
  })
  .catch((error) => {
    response.status(404).json({error})
  });
});

app.get('/api/v1/districts', (request, response) => {
  database('districts').select()
  .then((districts) => {
    response.status(200).json(districts)
  })
  .catch((error) => {
    response.status(404).json({error})
  });
});

app.get('/api/v1/counties', (request, response) => {
  database('counties').select()
  .then((counties) => {
    response.status(200).json(counties)
  })
  .catch((error) => {
    response.status(404).json({ error })
  });
});

app.get('/api/v1/counties/:name', (request, response) => {
  const name = request.params.name.toString().toUpperCase()
  console.log('county name', name);

  database('counties').where('name',  name).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with name ${request.params.name}`
    })
  });
});

app.get('/api/v1/districts/:name', (request, response) => {
  const name = request.params.name.toString().toUpperCase();

  database('districts').where('name',  name).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with name ${request.params.name}`
    })
  });
});

//notworking yet
// app.get('/api/v1/districts/:code', (request, response) => {
//   const code = request.params.code;
//   database('districts').where('district_code', code).select()
//   .then((county) => {
//     response.status(200).json(county)
//   })
//   .catch((error) => {
//     response.status(404).json({
//       error: `Could not find county with code ${request.params.code}`
//     })
//   });
// });

app.get('/api/v1/schools/:name', (request, response) => {
  const name = request.params.name.toString().toUpperCase();

  database('schools').where('name',  name).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with name ${request.params.name}`
    })
  });
});



//posts -- not sure how we will even make a post at this point--
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

//delete
app.delete('/api/v1/schools/:id', (request, response) => {
  const { id } = request.params;
  console.log('id: ', id);

  database('schools').where({ id }).del()
  .then(palette => {
    if (palette) {
      response.sendStatus(204)
    } else {
      response.status(422).json({ error: 'Not Found' })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
