const express = require("express"),
  router = express.Router({ mergeParams: true }),
  flash = require("connect-flash"),
  reviews = require("../controllers/reviews"),
  Review = require("../models/review"),
  { reviewSchema } = require("../models/validateSchema"),
  ExpressError = require("../utils/ExpressError"),
  Campground = require("../models/campground"),
  catchAsync = require("../utils/catchAsync.js"),
  { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.reviewDelete)
);

module.exports = router;
