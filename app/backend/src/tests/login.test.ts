import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Method Post, route /login', () => {

 let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "create")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Success request to POST /login', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body)
      .to.be.eql({ token: 'token' });
  });

  it('Error request to POST /login allow access without providing a email', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ password: 'asdasjdbashb' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body)
      .to.be.eql({ message: 'All fields must be filled' })
  });

  it('Error request to POST /login allow access without providing a password', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body)
      .to.be.eql({ message: 'All fields must be filled' })
  });

  it('Error request to POST /login with invalid email', () => async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'a', password: 'password' })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body)
      .to.be.eql({ message: 'Incorrect email or password' })
  });

  it('Error request to POST /login with invalid password', () => async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'pasd' })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body)
      .to.be.eql({ message: 'Incorrect email or password' })
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
