const User = require("./User");
const Library = require("./Library");
const Wishlist = require("./Wishlist");
const Game = require("./Game");
const Genre = require("./Genre");
const GameLibrary = require('./GameLibrary')
const GameWishlist = require("./GameWishlist");
const GameGenre = require("./GameGenre");

User.hasOne(Library, {
  foreignKey: "user_id",
});

Library.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Wishlist, {
  foreignKey: "user_id",
});

Wishlist.belongsTo(User, {
  foreignKey: "user_id",
})

Library.belongsToMany(Game, {
  through: GameLibrary
});

Game.belongsToMany(Library, {
  through: GameLibrary
})

Wishlist.belongsToMany(Game, {
  through: GameWishlist
});

Game.belongsToMany(Wishlist, {
  through: GameWishlist
})

Genre.belongsToMany(Game, {
  through: GameGenre
})

Game.belongsToMany(Genre, {
  through: GameGenre
})

module.exports = { User, Library, Wishlist, Game, Genre, GameLibrary, GameWishlist, GameGenre };
