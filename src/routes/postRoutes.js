const express = require('express');
const router = express.Router();
const controllers = require("../controllers/postController");

router.post('/posts', controllers.createPost);

router.get('/posts/:id/analysis', controllers.getAnalysis);

module.exports = router;