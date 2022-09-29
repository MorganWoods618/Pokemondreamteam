const router = require("express").Router();
const characterRoutes = require("./characterRoutes");
const userRoutes = require("./user")

router.use("/characters", characterRoutes);
router.use("/user", userRoutes)
module.exports = router;
