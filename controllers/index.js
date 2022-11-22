const routuer = require("express").Router();

const apiRoutes = require("./home-routes");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-route.js");
const router = require("./home-routes");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
