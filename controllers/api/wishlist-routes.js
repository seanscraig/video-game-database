const router = require("express").Router();
const { Wishlist, Game, GameWishlist } = require("../../models");
const withAuth = require("../../utils/auth");

// router.get("/me", async (req, res) => {
//   try {
//     const dbWishlistData = await Wishlist.findOne({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "is_public", "user_id"],
//       include: {
//         model: Game,
//         through: GameWishlist,
//       },
//     });

//     if (!dbWishlistData) {
//       res.status(404).json({ message: "No wishlist found with this id." });
//       return;
//     }

//     const wishlist = dbWishlistData.get({ plain: true });
//     res.status(200).json(wishlist);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const game = await Game.findOne({ where:{id: req.body.game_id}});
    const newGame = await wishlist.addGame(game);
    res.status(200).json(newGame);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;