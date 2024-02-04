const express = require("express");
const router = express.Router();

// import routes
const authRoute = require("./authRoute");
const creatorRoute = require("./creatorRoute");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

// auth routes
router.use("/auth", authRoute);
router.use("/creator", isAuthenticated, creatorRoute);

module.exports = router;
