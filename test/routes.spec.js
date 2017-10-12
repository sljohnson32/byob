const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return some text from our default page', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.include('School/s in session sucka!')
      done();
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    chai.request(server)
    .get('/rickandmorty')
    .end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  it('should return all the counties!', (done) => {
    chai.request(server)
    .get('/api/v1/counties')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(65);
      done();
    });
  });

  it('should return all the districts!', (done) => {
    chai.request(server)
    .get('/api/v1/districts')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(181);
      done();
    });
  });

  it('should return all the schools!', (done) => {
    chai.request(server)
    .get('/api/v1/schools')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(1865);
      done();
    });
  });

  it('should be able to return a county by the id', (done)=> {
    chai.request(server)
    .get('/api/v1/counties/12')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('name');
      response.body[0].name.should.equal('CONEJOS');
      response.body[0].should.have.property('county_code');
      response.body[0].county_code.should.equal('11');
      done();
    });
  });

  it('should be able to return a district by the id', (done)=> {
    chai.request(server)
    .get('/api/v1/districts/60')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('name');
      response.body[0].name.should.equal('FALCON 49');
      response.body[0].should.have.property('district_code');
      response.body[0].district_code.should.equal('1110');
      response.body[0].should.have.property('county_id');
      response.body[0].county_id.should.equal(20);
      done();
    });
  });

  it('should be able to return a school by the id', (done)=> {
    chai.request(server)
    .get('/api/v1/schools/563')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.should.be.a('object');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('name');
      response.body[0].name.should.equal('EAST HIGH SCHOOL');
      response.body[0].should.have.property('school_code');
      response.body[0].school_code.should.equal('2398');
      response.body[0].should.have.property('student_count');
      response.body[0].student_count.should.equal(2543);
      response.body[0].should.have.property('teacher_count');
      response.body[0].teacher_count.should.equal(136.1);
      response.body[0].should.have.property('student_teacher_ratio');
      response.body[0].student_teacher_ratio.should.equal(18.69);
      response.body[0].should.have.property('district_id');
      response.body[0].district_id.should.equal(40);
      done();
    });
  });

});
