require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");
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
      const gameAPIRequestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.params.title}`;

      axios({
        method: "get",
        url: gameAPIRequestURL,
        responseType: "jsonp",
      }).then(async function (response) {
        const result = response.data.results[0];
        const title = result.name;
        const image = result.background_image;
        const game = await Game.create({ title, image });
        return res.status(200).json(game);
      });
    } else {
      const game = dbGameData.get({ plain: true });

      res.status(200).json(game);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
