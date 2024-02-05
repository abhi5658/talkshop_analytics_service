const express = require('express');
const router = express.Router();

const allControllers = require('../controllers/tradingController');

router.get('/user/videos', allControllers.listVideos);
router.post('/user/videos', allControllers.postVideo);
router.post('/trade/sell', allControllers.sellStock);
router.post('/trade/buy', allControllers.buyStock);
router.get('/user/trades', allControllers.listTrades);
router.get('/public/leaderboard', allControllers.getLeaderboard);

module.exports = router;