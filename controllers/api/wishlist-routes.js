const router = require("express").Router();
const { Wishlist, Game, GameWishlist } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const game = await Game.findOne({ where: { title: req.body.title } });
    const newGame = await wishlist.addGame(game);
    console.log("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD");
    res.status(200).json(newGame);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {});

module.exports = router;
