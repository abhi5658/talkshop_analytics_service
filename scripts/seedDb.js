const { Post } = require('../src/models');
const { sequelize, User, Videos, Portfolio, Trades, Stocks } = require('../src/models');
const uuidV4 = require('uuid').v4;

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
module.exports = seed();

async function seed() {
  // reset full DB and create tables
  await sequelize.sync({ force: true });

  // create tables
  // await Post.sync({ force: true });

  //insert data
  await Promise.all([
    Post.create({
      id: 1,
      uuid: uuidV4(),
      caption: 'Chasing sunsets and making memories. 🌅 Embrace the journey, explore the unknown, and let your heart guide you. #Wanderlust #AdventureTime',
    }),
    Post.create({
      id: 2,
      uuid: uuidV4(),
      caption: 'Cozy evenings, warm blankets, and a good book. 📚 Finding joy in the simple moments. #SimplePleasures #HomeSweetHome',
    }),
    Post.create({
      id: 3,
      uuid: uuidV4(),
      caption: 'Sipping on positivity, one coffee at a time. ☕️ Life\'s better when you\'re caffeinated and motivated. #CoffeeLover #MondayMotivationKnows nothing',
    }),
    Post.create({
      id: 4,
      uuid: uuidV4(),
      caption: 'Let loose, feel the rhythm, and embrace the magic of the moment. 💃🕺 Music on, worries off. #DanceFloorMagic #LiveInTheMoment',
    }),
    Post.create({
      id: 5,
      uuid: uuidV4(),
      caption: 'Breathing in the crisp mountain air, surrounded by towering trees. 🌲 Finding peace in the serenity of the great outdoors. #NatureLover #MountainEscape',
    }),
    Post.create({
      id: 6,
      uuid: uuidV4(),
      caption: 'Brush strokes and vibrant hues bring life to the canvas. 🎨 Expressing the soul through art. #ArtisticSoul #CreativityUnleashed',
    }),
    Post.create({
      id: 7,
      uuid: uuidV4(),
      caption: 'Sweating it out, one workout at a time. 💪 Embracing the grind and celebrating progress, not perfection. #FitnessMotivation #WorkoutWednesday',
    }),
    Post.create({
      id: 8,
      uuid: uuidV4(),
      caption: 'Exploring flavors from around the world in my own kitchen. 🍜 Bringing global cuisine to the dining table. #FoodieAdventures #HomeChefVibes',
    }),
  ]);

  await Promise.all([
    User.create({
      id: 1,
      name: 'ABC',
    }),
    User.create({
      id: 2,
      name: 'LMN',
    }),
    User.create({
      id: 3,
      name: 'XYZ',
    }),
    Stocks.create({
      id: 1,
      name: 'Stock1',
      rate: 10
    }),
    Stocks.create({
      id: 2,
      name: 'Stock2',
      rate: 20
    }),
    Stocks.create({
      id: 3,
      name: 'Stock3',
      rate: 30
    })
  ]);
}
