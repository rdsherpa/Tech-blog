const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-route.js");

router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
