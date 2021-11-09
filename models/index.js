const User = require("./User");
const Library = require("./Library");
const Wishlist = require("./Wishlist");
const Game = require("./Game");

User.hasOne(Library, {
  foreignKey: "library_id",
});

Library.belongsTo(User, {
  foreignKey: "library_id",
});

User.hasOne(Wishlist, {
  foreignKey: "wishlist_id",
});

Wishlist.belongsTo(User, {
  foreignKey: "wishlist_id",
})

Library.hasMany(Game, {
  foreignKey: "library_game_id",
  onDelete: "CASCADE",
});

Game.belongsTo(Library, {
  foreignKey: "library_game_id",
})

Wishlist.hasMany(Game, {
  foreignKey: "wishlist_game_id",
  onDelete: "CASCADE",
});

Game.belongsTo(Wishlist, {
  foreignKey: "wishlist_game_id",
})

module.exports = { User, Library, Wishlist, Game };
