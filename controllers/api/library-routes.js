const router = require("express").Router();
const { Library, Game, GameLibrary } = require("../../models");
const withAuth = require("../../utils/auth");

// router.get("/me", async (req, res) => {
//   try {
//     const dbLibraryData = await Library.findOne({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "is_public", "user_id"],
//       include: {
//         model: Game,
//         through: GameLibrary,
//       },
//     });

//     if (!dbLibraryData) {
//       res.status(404).json({ message: "No library found with this id." });
//       return;
//     }

//     const library = dbLibraryData.get({ plain: true });
//     res.status(200).json(library);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, async (req, res) => {
  try {
    const library = await Library.findOne({
      where: {
        user_id: req.session.user_id,
      },
    });
    const game = await Game.findOne({ where:{title: req.body.title}});
    const newGame = await library.addGame(game);
    res.status(200).json(newGame);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
