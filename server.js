const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('secretKey', 'BillBrasky')



//Client-side endpoint
app.get('/', (request, response) => {
  response.send('School/s in session sucka!');
});

//Authentication endpoint
app.post('/api/v1/authentication', (request, response) => {
  let payload = request.body;
  let key = app.get('secretKey');
  let options = { expiresIn: '1h' }

  for (let requiredParameter of ['email', 'appName']) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { email: <String>, appName: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  if (payload.email.endsWith('@turing.io')) { payload.user = 'admin'} ;

  let token = jwt.sign(payload, key, options)
  return response.status(201).json(token)
})

//API endpoints
app.get('/api/v1/schools', (request, response) => {
  let ratioMin = request.query.ratioMin;
  let ratioMax = request.query.ratioMax;

  const checkQuery = () => {
    if (ratioMin && ratioMax) {
      return database('schools').where('student_teacher_ratio', '>=', ratioMin).where('student_teacher_ratio', '<=', ratioMax).select()
    }
    if (ratioMin && !ratioMax) {
      return database('schools').where('student_teacher_ratio', '>=', ratioMin).select()
    }
    if (!ratioMin && ratioMax) {
      return database('schools').where('student_teacher_ratio', '<=', ratioMax).select()
    }
    if (!ratioMin && !ratioMax) {
      return database('schools').select()
    }
  }

  checkQuery()
    .then((schools) => {
      return response.status(200).json(schools)
    })
    .catch((error) => {
      response.status(404).json({error})
    });
});

app.get('/api/v1/districts', (request, response) => {
  let { countyID } = request.query;

  const checkQuery = () => {
    if (countyID) {
      return database('districts').where('county_id', countyID).select()
    } else return database('districts').select()
  }

  checkQuery()
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

app.get('/api/v1/counties/:id', (request, response) => {
  const id = request.params.id;

  database('counties').where('id', id).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with id ${request.params.id}`
    })
  });
});

app.get('/api/v1/districts/:id', (request, response) => {
  const id = request.params.id;

  database('districts').where('id', id).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with id ${request.params.id}`
    })
  });
});

app.get('/api/v1/schools/:id', (request, response) => {
  const id = request.params.id;

  database('schools').where('id', id).select()
  .then((county) => {
    response.status(200).json(county)
  })
  .catch((error) => {
    response.status(404).json({
      error: `Could not find county with id ${request.params.id}`
    })
  });
});

//posts -- not sure how we will even make a post at this point--
app.post('/api/v1/schools', (request, response) => {
  const school = request.body;

  for (let requiredParameter of ['name', 'school_code', 'student_count', 'teacher_count', 'student_teacher_ratio', 'district_id']) {
    if (!school[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, school_code: <String>, student_count: <String>, techer_count: <String>, studetn_teacher_ratio: <String> }. You're missing a "${requiredParameter}" property.` });
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

  for (let requiredParameter of ['name', 'district_code', 'county_id']) {
    if (!district[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, district_code: <String>, county_id: <String> }. You're missing a "${requiredParameter}" property.` });
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

//delete
app.delete('/api/v1/schools/:id', (request, response) => {
  const { id } = request.params;

  database('schools').where({ id }).del()
  .then(school => {
    if (school) {
      response.status(202).json(`School ${id} was deleted from database`)
    } else {
      response.status(422).json({ error: 'Not Found' })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
});

app.delete('/api/v1/districts/:id', (request, response) => {
  const { id } = request.params;

  database('districts').where({ id }).del()
  .then(district => {
    if (district) {
      response.status(202).json(`District ${id} was deleted from database`)
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
