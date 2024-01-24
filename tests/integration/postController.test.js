const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../../src/app');
const uuidV4 = require('uuid').v4;

chai.use(chaiHttp);

describe('# postController', () => {
    describe('GET /api/v1/posts/:id/analysis', () => {
        it('server should respond 200 with analysis', (done) => {
            chai.request(server)
                .get('/api/v1/posts/1/analysis')
                .end((err, res) => {
                    expect(res.status).to.be.eql(200);
                    expect(res.body).is.not.null;
                    expect(res.body.message).is.equal('success');
                    expect(res.body.wordCount).is.equal(20);
                    expect(res.body.averageWordCount).is.equal(19.25);
                    done();
                });
        });
    });

    describe('POST /api/v1/posts', () => {
        it('server should respond 200 with analysis', (done) => {
            const post = {
                "uuid": uuidV4(),
                "caption": "the good caption"
            }
            chai.request(server)
                .post('/api/v1/posts',)
                .send(post)
                .end((err, res) => {
                    expect(res.status).to.be.eql(200);
                    expect(res.body).is.not.null;
                    expect(res.body.message).is.equal('success');
                    expect(res.body.post).is.not.null;
                    expect(res.body.post.id).is.equal(9);
                    done();
                });
        });
    });

    describe('GET /api/v1/posts/:id/analysis', () => {
        it('server should respond 200 with UPDATED analysis', (done) => {
            chai.request(server)
                .get('/api/v1/posts/9/analysis')
                .end((err, res) => {
                    expect(res.status).to.be.eql(200);
                    expect(res.body).is.not.null;
                    expect(res.body.message).is.equal('success');
                    expect(res.body.wordCount).is.equal(3);
                    expect(res.body.averageWordCount).is.equal(17.444444444444443);
                    done();
                });
        });
    });

});