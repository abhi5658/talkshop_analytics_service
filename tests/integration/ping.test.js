const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../src/app');

chai.use(chaiHttp);

describe('# App Test', () => {

    describe('GET /ping', () => {
        it('server should respond', (done) => {
            chai.request(server)
                .get('/ping',)
                .end((err, res) => {
                    expect(res.status).to.be.eql(200);
                    expect(res.body).to.be.eql({ "message": "pong" })
                    done();
                });
        });
    });
});