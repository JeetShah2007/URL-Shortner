const express = require("express");

const {
    createShortURL,
    redirectToURL,
    getAnalytics
} = require("../controllers/urlController");

const router = express.Router();


// Create Short URL
router.post("/", createShortURL);


// Analytics
router.get("/analytics/:shortId", getAnalytics);


// Redirect
router.get("/:shortId", redirectToURL);


module.exports = router;