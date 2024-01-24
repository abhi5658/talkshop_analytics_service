before(async function (done) {
    // create a test DB
    const seed = require('../scripts/seedDb');
    await seed;
    done();
})

require('./unit/postService.test');
require('./integration/ping.test');
require('./integration/postController.test');