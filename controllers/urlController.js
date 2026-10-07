const URL = require("../models/url");
const shortid = require("shortid");


// Create Short URL
async function createShortURL(req, res) {

    const body = req.body;

    if (!body.redirectURL) {
        return res.status(400).json({
            error: "redirectURL is required"
        });
    }

    const shortId = shortid.generate();

    const url = await URL.create({
        shortId: shortId,
        redirectURL: body.redirectURL,
        totalClicks: 0,
        clickHistory: []
    });

    console.log("Generated Short ID:", shortId);

    return res.render("result", {
        shortId: shortId,
        redirectURL: url.redirectURL
    });
}


// Redirect to Original URL
async function redirectToURL(req, res) {

    const shortId = req.params.shortId;

    console.log("Received Short ID:", shortId);

    const url = await URL.findOne({
        shortId: shortId
    });

    if (!url) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    // Increase click count
    url.totalClicks = url.totalClicks + 1;

    // Store click time
    url.clickHistory.push({
        timestamp: new Date()
    });

    await url.save();

    // Redirect to original URL
    return res.redirect(url.redirectURL);
}


// Analytics
async function getAnalytics(req, res) {

    const shortId = req.params.shortId;

    const url = await URL.findOne({
        shortId: shortId
    });

    if (!url) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    return res.json({
        shortId: url.shortId,
        redirectURL: url.redirectURL,
        totalClicks: url.totalClicks,
        clickHistory: url.clickHistory
    });
}


module.exports = {
    createShortURL,
    redirectToURL,
    getAnalytics
};