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

module.exports = {
  sequelize,
  Post,
};
