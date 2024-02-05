const express = require('express');
const router = express.Router();
const controllers = require("../controllers/postController");
const rateLimiter = require('../middleware/rateLimiter')

router.post('/posts', rateLimiter, controllers.createPost);

router.get('/posts/:id/analysis', rateLimiter, controllers.getAnalysis);

module.exports = router;