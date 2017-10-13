/*eslint-disable */
const setJWTs = () => {
  chai.request(server)
    .post('/api/v1/authentication')
    .send({ email: 'sam@turing.io', appName: 'byob' })
    .end((error, response) => adminToken = JSON.parse(response.text));

  chai.request(server)
    .post('/api/v1/authentication')
    .send({ email: 'sam@ricknmorty.com', appName: 'byob' })
    .end((error, response) => regToken = JSON.parse(response.text));
};

//not sure if we could have done more to authenticate and or check authorization.
