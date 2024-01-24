const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const rateLimiter = require('./middleware/rateLimiter');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});

const postRoutes = require('./routes/postRoutes');
app.use('/api/v1/', rateLimiter, postRoutes);

// default 404 handler
app.use(function (req, res, next) {
    res.status(404);
    res.json({ error: 'Route not found' });

    return;
});

module.exports = app;
