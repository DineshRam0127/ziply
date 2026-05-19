const Url = require("../models/Url");

const { nanoid } = require("nanoid");


// CREATE SHORT URL
const createShortUrl = async (req, res) => {

  try {

    const {
      originalUrl,
      customAlias,
      expiryDays,
    } = req.body;

    // URL validation
    const urlPattern = /^(https?:\/\/)/;

    if (!urlPattern.test(originalUrl)) {

      return res.status(400).json({
        message: "Please enter a valid URL",
      });
    }

    // Generate short code
    let shortCode;

    if (customAlias) {

      const existingAlias =
        await Url.findOne({
          shortCode: customAlias,
        });

      if (existingAlias) {

        return res.status(400).json({
          message:
            "Custom alias already taken",
        });
      }

      shortCode = customAlias;

    } else {

      shortCode = nanoid(6);
    }

    // EXPIRY DATE
    let expiryDate = null;

    if (expiryDays) {

      expiryDate = new Date();

      expiryDate.setDate(
        expiryDate.getDate() +
        Number(expiryDays)
      );
    }

    // SAVE TO DATABASE
    const newUrl = await Url.create({

      user: req.user.id,

      originalUrl,

      shortCode,

      expiresAt: expiryDate,

    });

    res.status(201).json({

      message:
        "Short URL created successfully",

      shortUrl:
        `http://localhost:5000/${shortCode}`,

      data: newUrl,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER URLS
const getUserUrls = async (req, res) => {

  try {

    const urls = await Url.find({
      user: req.user.id,
    });

    res.status(200).json(urls);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE URL
const deleteUrl = async (req, res) => {

  try {

    const url = await Url.findById(
      req.params.id
    );

    if (!url) {

      return res.status(404).json({
        message: "URL not found",
      });
    }

    await Url.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "URL deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// EDIT URL
const editUrl = async (req, res) => {

  try {

    const { originalUrl } = req.body;

    const url = await Url.findById(
      req.params.id
    );

    if (!url) {

      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.originalUrl = originalUrl;

    await url.save();

    res.status(200).json({

      message:
        "URL updated successfully",

      data: url,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// REDIRECT URL
const redirectUrl = async (req, res) => {

  try {

    const { shortCode } = req.params;

    const url = await Url.findOne({
      shortCode,
    });

    if (!url) {

      return res.status(404).json({
        message: "URL not found",
      });
    }

    // CHECK EXPIRY
    if (
      url.expiresAt &&
      new Date() > url.expiresAt
    ) {

      return res
        .status(400)
        .send("Link Expired");
    }

    // INCREASE CLICKS
    url.clicks += 1;

    // STORE CLICK HISTORY
    url.clickHistory.push({
      timestamp: new Date(),
    });

    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// ANALYTICS
const getAnalytics = async (req, res) => {

  try {

    const url = await Url.findById(
      req.params.id
    );

    if (!url) {

      return res.status(404).json({
        message: "URL not found",
      });
    }

    res.status(200).json({

      originalUrl: url.originalUrl,

      shortCode: url.shortCode,

      totalClicks: url.clicks,

      createdAt: url.createdAt,

      lastVisited:
        url.clickHistory.length > 0
          ? url.clickHistory[
              url.clickHistory.length - 1
            ].timestamp
          : "No visits yet",

      recentVisits: url.clickHistory,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {

  createShortUrl,

  getUserUrls,

  deleteUrl,

  editUrl,

  redirectUrl,

  getAnalytics,

};