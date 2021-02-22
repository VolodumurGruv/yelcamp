const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  { storage } = require("../cloudinary"),
  upload = multer({ storage }),
  campgrounds = require("../controllers/campgrounds"),
  flash = require("connect-flash"),
  catchAsync = require("../utils/catchAsync"),
  Campground = require("../models/campground"),
  { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
