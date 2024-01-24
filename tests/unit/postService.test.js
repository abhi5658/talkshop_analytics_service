const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const { createPost, getCaptionWordCount, getAvgWordCount } = require('../../src/services/postService');
const { Post, sequelize } = require('../../src/models');
const cacheService = require('../../src/services/cacheService');

describe('# postService', () => {

    describe('createPost', () => {
        it('should create a post', async () => {
            const uuid = '12345';
            const caption = 'This is a test caption';

            // Stub the Post.create method to avoid actual database calls
            const createStub = sinon.stub(Post, 'create').resolves({ uuid, caption });

            // Stub cacheService.del method
            const cacheDelStub = sinon.stub(cacheService, 'del');

            const post = await createPost(uuid, caption);

            // Assertions
            expect(post).to.have.property('uuid', uuid);
            expect(post).to.have.property('caption', caption);
            expect(createStub.calledOnceWithExactly({ uuid, caption })).to.be.true;
            expect(cacheDelStub.calledOnceWithExactly('post::global::avgWordCount')).to.be.true;

            // Restore stubs
            createStub.restore();
            cacheDelStub.restore();
        });
    });

    describe('getCaptionWordCount', () => {
        it('should get word count from cache if available', async () => {
            const id = 1;
            const key = `post::id::${id}::wordCount`;
            const wordCountData = { count: 5 };

            // Stub cacheService.has and cacheService.get methods
            const hasStub = sinon.stub(cacheService, 'has').returns(true);
            const getStub = sinon.stub(cacheService, 'get').returns(wordCountData);

            const result = await getCaptionWordCount(id);

            // Assertions
            expect(result).to.deep.equal(wordCountData);
            expect(hasStub.calledOnceWithExactly(key)).to.be.true;
            expect(getStub.calledOnceWithExactly(key)).to.be.true;

            // Restore stubs
            hasStub.restore();
            getStub.restore();
        });
    });

    describe('getAvgWordCount', () => {
        it('should get average word count from cache if available', async () => {
            const key = 'post::global::avgWordCount';
            const avgWordCountData = { count: 10 };

            // Stub cacheService.has and cacheService.get methods
            const hasStub = sinon.stub(cacheService, 'has').returns(true);
            const getStub = sinon.stub(cacheService, 'get').returns(avgWordCountData);

            const result = await getAvgWordCount();

            // Assertions
            expect(result).to.deep.equal(avgWordCountData);
            expect(hasStub.calledOnceWithExactly(key)).to.be.true;
            expect(getStub.calledOnceWithExactly(key)).to.be.true;

            // Restore stubs
            hasStub.restore();
            getStub.restore();
        });
    });

});
