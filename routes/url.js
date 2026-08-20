const express=require("express");
const {
    createShortURL,
    redirectToURL,
    getAnalytics
} = require("../controllers/urlController");

const router = express.Router();

router.post("/",createShortURL);
router.get("/analytics/:shortId",getAnalytics)
router.get("/:shortId", redirectToURL);

module.exports=router;
