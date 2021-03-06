const router = require('express').Router();
const { User, Game, GameLibrary, GameWishlist, Library, Wishlist } = require('../../models');
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Game,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at',
                        'library_game_id',
                        'wishlist_game_id'
                    ]
                },

                {
                    model: GameLibrary,
                    attributes: [
                        'game_id', 
                        'library_id'
                    ],
                    include: {
                        model: Game,
                        attributes: ['title']
                    }
                },
                
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', async (req, res) => {

    const newUser = await User.create({
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email
    })

    await Library.create({
        user_id: newUser.id,
        is_public: true
    })

    await Wishlist.create({
        user_id: newUser.id,
        is_public: true
    })

    .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.user_name = dbUserData.user_name;
                req.session.logged_in = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                user_name: req.body.user_name
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that username!' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = dbUserData.id;
                req.session.user_name = dbUserData.user_name;
                req.session.logged_in = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;