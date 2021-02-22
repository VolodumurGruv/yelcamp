const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  users = require("../controllers/users"),
  catchAsync = require("../utils/catchAsync"),
  User = require("../models/user");

router
  .route("/register")
  .get(users.userRegister)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;
