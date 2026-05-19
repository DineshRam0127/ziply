const express = require("express");

const protect = require("../middleware/authMiddleware");

const {

  createShortUrl,

  getUserUrls,

  deleteUrl,

  editUrl,

  getAnalytics,

} = require("../controllers/urlController");

const router = express.Router();


// CREATE URL
router.post(
  "/create",
  protect,
  createShortUrl
);


// GET USER URLS
router.get(
  "/myurls",
  protect,
  getUserUrls
);


// DELETE URL
router.delete(
  "/:id",
  protect,
  deleteUrl
);


// EDIT URL
router.put(
  "/edit/:id",
  protect,
  editUrl
);


// ANALYTICS
router.get(
  "/analytics/:id",
  protect,
  getAnalytics
);

module.exports = router;