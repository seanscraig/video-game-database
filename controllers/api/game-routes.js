const router = require("express").Router();
const { Game, Genre, GameGenre } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbGameData = await Game.findAll({
      attributes: ["id", "title", "image"],
      include: Genre
    });
  
    const games = dbGameData.map((game) => game.get({plain: true}));
  
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbGameData = await Game.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "image"],
      include: Genre
    });

    console.log(dbGameData);

    if (!dbGameData) {
      res.status(404).json({message: "No game found with this id."});
      return;
    }

    const game = dbGameData.get({plain: true});

    console.log(game);

    res.status(200).json(game);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;