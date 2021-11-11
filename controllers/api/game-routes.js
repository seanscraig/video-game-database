const router = require("express").Router();
const { Game, Genre } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbGameData = await Game.findAll({
      attributes: ["id", "title", "image"],
      include: Genre,
    });

    const games = dbGameData.map((game) => game.get({ plain: true }));

    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const dbGameData = await Game.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "image"],
      include: Genre,
    });

    if (!dbGameData) {
      res.status(404).json({ message: "No game found with this id." });
      return;
    }

    const game = dbGameData.get({ plain: true });

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const dbGameData = await Game.findOne({
      where: {
        title: req.params.title,
      },
      attributes: ["id", "title", "image"],
      include: Genre,
    });

    if (!dbGameData) {
      res.status(404).json({ message: "No game found with this title." });
      return;
    }

    const game = dbGameData.get({ plain: true });

    res.status(200).json(game);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
