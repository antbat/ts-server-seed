import { getApp } from '../../app';
import { Application } from 'express';
import chai = require('chai');
import chaiHttp = require('chai-http');
import 'mocha';

let app: Application;

chai.should();
chai.use(chaiHttp);

describe('Auth server', async () => {
    before(async () => {
        app = (await getApp()).application;
    });
    it('should return response on call', async () => {
        const res = await chai.request(app).get('/');
        res.should.have.status(200);
    })
});
