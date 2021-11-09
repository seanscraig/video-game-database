const User = require("./User");
const Library = require("./Library");
const Wishlist = require("./Wishlist");
const Game = require("./Game");
const GameLibrary = require('./GameLibrary')
const GameWishlist = require("./GameWishlist");

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

module.exports = { User, Library, Wishlist, Game, GameLibrary, GameWishlist };
