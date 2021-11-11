const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const wishlistRoutes = require("./wishlist");

router.use("/api", apiRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/", homeRoutes);

module.exports = router;