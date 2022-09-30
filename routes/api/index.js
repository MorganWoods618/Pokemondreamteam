const router = require("express").Router();
const characterRoutes = require("./characterRoutes");
const userRoutes = require("./user")
// Prefix all routes defined in `bookRoutes.js` with `/books
router.use("/characters", characterRoutes);
router.use("/user", userRoutes)
module.exports = router;
