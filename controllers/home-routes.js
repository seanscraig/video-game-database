const router = require('express').Router();
const { User, Library, Game, GameLibrary, Genre } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios')



router.get("/", (req, res) => {
  res.render("homepage");
})

router.get("/me", withAuth, async (req, res) => {
  try {
    const dbLibraryData = await Library.findOne({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "is_public", "user_id"],
      include: {
        model: Game,
        through: GameLibrary,
      },
    });

    if (!dbLibraryData) {
      res.status(404).json({ message: "No library found with this user id." });
      return;
    }

    const library = dbLibraryData.get({ plain: true });

    res.render("library", {
      ...library,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    console.log(err);
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

    res.render("game", {
      ...game,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/me');
    return;
  }

  res.render('login');
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

    console.log(dbGameData);

    if (!dbGameData) {
      const gameAPIRequestURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.params.title}`;

      axios({
        method: "get",
        url: gameAPIRequestURL,
        responseType: "json",
      }).then(async function (response) {
        const result = response.data.results[0];
        const title = result.name;
        const image = result.background_image;
        const game = await Game.create({ title, image });
        await res.render("game", {
          ...game,
          logged_in: req.session.logged_in
        })
      });
    } else {
      const game = dbGameData.get({ plain: true });

      console.log(game);

      res.render("game", {
        ...game,
        logged_in: req.session.logged_in
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;