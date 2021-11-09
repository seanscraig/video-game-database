const User = require("./User");
const Library = require("./Library");
const Wishlist = require("./Wishlist");
const Game = require("./Game");

User.hasOne(Library, {
  foreignKey: "library_id",
});

Library.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasOne(Wishlist, {
  foreignKey: "wishlist_id",
});

Wishlist.belongsTo(User, {
  foreignKey: "user_id",
})

Library.belongsToMany(Game, {
  through: GameLibrary,
});

Game.belongsToMany(Library, {
  through:GamesLibrary,
})

Wishlist.belongsToMany(Game, {
  through: GameWishlist,
});

Game.belongsToMany(Wishlist, {
  through: GameWishlist,
})

module.exports = { User, Library, Wishlist, Game };
