const router = require('express').Router();
const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');
const libraryRoutes = require('./library-routes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/librarys', libraryRoutes);

module.exports = router;