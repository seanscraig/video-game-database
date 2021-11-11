const router = require('express').Router();
const { User, Library, Game, GameLibrary } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", (req, res) => {
    res.render("homepage");
})

router.get("/me", async (req, res) => {
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

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/me');
    return;
  }

  res.render('login');
});

module.exports = router;