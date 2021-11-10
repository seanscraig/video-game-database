const sequelize = require("../config/connection");
const {
  User,
  Library,
  Wishlist,
  Game,
  Genre,
  GameGenre,
} = require("../models");

const userData = require("./userData.json");
const genreData = require("./genreData.json");
const gameData = require("./gameData.json");
const gameGenreData = require("./gameGenreData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // console.log(users);

  const genres = await Genre.bulkCreate(genreData, {
    returning: true,
  });

  // console.log(genres);

  const games = await Game.bulkCreate(gameData, {
    returning: true,
  });

  // console.log(games);

  for (pair of gameGenreData) {
    const game = await Game.findOne({where: {"id": pair.game_id}});
    const genre = await Genre.findOne({where: {"id": pair.genre_id}});
    await game.addGenre(genre);
  }

  const gameGenre = await Game.findAll({ include: Genre });

  const gameGenreArr = gameGenre.map((genre) => genre.get({ plain: true }));

  for (let i = 0; i < gameGenreArr.length; i++) {
    console.log(gameGenreArr[i]);
  }

  process.exit(0);
};

seedDatabase();
