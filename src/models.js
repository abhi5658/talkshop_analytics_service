const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? './database-test.sqlite3' : './database.sqlite3',
  logging: process.env.NODE_ENV === 'test' ? false : undefined,
});

class Post extends Sequelize.Model { }
Post.init(
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    caption: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts'
  }
);


/**
 * STOCK TRADING BACKEND
 *
 * user
 * portfolio
 * videos
 * trades
 * stocks
 */

class User extends Sequelize.Model { }
User.init(
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10000
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);
class Portfolio extends Sequelize.Model { }
Portfolio.init(
  {
    // stockId
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Portfolio',
    tableName: 'portfolio'
  }
);
class Videos extends Sequelize.Model { }
Videos.init(
  {
    url: {
      type: Sequelize.TEXT,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Videos',
    tableName: 'videos'
  }
);
class Trades extends Sequelize.Model { }
Trades.init(
  {
    // stockId
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tradeType: {
      type: Sequelize.ENUM('BUY', 'SELL'),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Trades',
    tableName: 'trades'
  }
);
class Stocks extends Sequelize.Model { }
Stocks.init(
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Stocks',
    tableName: 'stocks'
  }
);

User.hasMany(Portfolio, { foreignKey: 'userId' });
Portfolio.belongsTo(User, { foreignKey: 'userId' });
Portfolio.belongsTo(Stocks, { foreignKey: 'stockId' })
User.hasMany(Videos, { foreignKey: 'userId' });
Videos.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Trades, { foreignKey: 'userId' });
Trades.belongsTo(User, { foreignKey: 'userId' });
Trades.belongsTo(Stocks, { foreignKey: 'stockId' });


module.exports = {
  sequelize,
  Post,
  User,
  Portfolio,
  Videos,
  Trades,
  Stocks,
};
