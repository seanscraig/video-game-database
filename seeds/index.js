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
const libraryData = require("./libraryData.json");
const wishlistData = require("./wishlistData.json");
const gameLibraryData = require("./gameLibraryData.json");
const gameWishlistData = require("./gameWishlistData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Genre.bulkCreate(genreData, {
    returning: true,
  });

  await Game.bulkCreate(gameData, {
    returning: true,
  });

  for (pair of gameGenreData) {
    const game = await Game.findOne({ where: { id: pair.game_id } });
    const genre = await Genre.findOne({ where: { id: pair.genre_id } });
    await game.addGenre(genre);
  }

  await Library.bulkCreate(libraryData, {
    returning: true,
  });

  await Wishlist.bulkCreate(wishlistData, {
    returning: true,
  });

  for (pair of gameLibraryData) {
    const game = await Game.findOne({ where: { id: pair.game_id } });
    const library = await Library.findOne({ where: { id: pair.library_id } });
    await library.addGame(game);
  }

  for (pair of gameWishlistData) {
    const game = await Game.findOne({ where: { id: pair.game_id } });
    const wishlist = await Wishlist.findOne({
      where: { id: pair.wishlist_id },
    });
    await wishlist.addGame(game);
  }

  process.exit(0);
};

seedDatabase();
