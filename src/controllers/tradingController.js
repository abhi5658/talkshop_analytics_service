const { sequelize, User, Videos, Portfolio, Trades, Stocks } = require('../models')

module.exports.listVideos = async (req, res) => {
  const userId = req.query.userId;
  const videos = await Videos.findAll({
    where: {
      userId: userId
    }
  })
  res.json({
    videos
  });
}
module.exports.postVideo = async (req, res) => {
  const userId = req.body.userId;
  const url = req.body.url
  const createdVideo = await Videos.create({
    url,
    userId
  })
  res.json({
    createdVideo
  });
}

module.exports.sellStock = async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  // deduct money
  const user = await User.findByPk(userId);
  const stock = await Stocks.findByPk(stockId);
  user.balance += stock.rate * quantity;

  // create a trade
  const tradedStock = await Trades.create({
    quantity: quantity,
    tradeType: 'SELL',
    rate: stock.rate,
    stockId: stockId,
    userId
  });
  // add to [portfolio]
  const [portfolio, asd] = await Portfolio.findCreateFind({
    where: {
      stockId: stockId,
      userId
    },
    defaults: {
      stockId,
      userId,
      quantity: 0,
    }
  },);
  portfolio.quantity -= quantity;
  await user.save();
  await portfolio.save();

  res.json({
    portfolio,
    tradedStock
  });
}

module.exports.buyStock = async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  // deduct money
  const user = await User.findByPk(userId);
  const stock = await Stocks.findByPk(stockId);
  user.balance -= stock.rate * quantity;

  // create a trade
  const tradedStock = await Trades.create({
    quantity: quantity,
    tradeType: 'BUY',
    rate: stock.rate,
    stockId: stockId,
    userId
  });
  // add to [portfolio]
  const [portfolio, asd] = await Portfolio.findCreateFind({
    where: {
      stockId: stockId,
      userId
    },
    defaults: {
      stockId,
      userId,
      quantity: 0,
    }
  },);
  portfolio.quantity += quantity;
  await user.save();
  await portfolio.save();

  res.json({
    portfolio,
    tradedStock
  });
}

module.exports.listTrades = async (req, res) => {
  const userId = req.query.userId;
  // const pageNo = req.query.pageNo || 1;
  // const limit = req.query.limit || 10; // max
  const trades = await Trades.findAll({
    where: {
      userId: userId
    },
    // limit: limit,
    // offset: limit * pageNo,
    order: [['createdAt', 'DESC']]
  })
  res.json({
    trades
  });
}


module.exports.getLeaderboard = async (req, res) => {
  const users = await User.findAll({
    order: [
      ['balance', 'DESC'],
      ['name', 'ASC']
    ]
  })
  res.json({
    users
  });
}