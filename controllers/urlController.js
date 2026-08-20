const shortid = require("shortid");
const URL=require("../models/url");
const shortid=require("shortid");
async function createShortURL(req,res){
    const body=req.body;
    if(!body.redirectURL){
        return res.status(400).json({
            error:"redirect url is required"
        })
    }
const shortId=shortid.generate();
const url=await URL.create({
    shortId:shortId,
    redirectURL:body.redirectURL,
    totalClicks:0,
    clickHistory:[]
});
return res.status(201).json({
    shortId:url.shortId,
    shortURL:`http://localhost:8000/${url.shortId}`,
    redirectURL: url.redirectURL
});
}

async function redirectToURL(req,res){
    const shortId=req.params.shortId
    const url=await URL.findOne({
        shortId:shortId
    })
    if(!url){
        return res.status(400).json({
            error:"short id not found"
        })
    }
    url.totalClicks=url.totalClicks+1;
    url.clickHistory.push({
        timestamp:new Date()
    }),
    await url.save();
    return res.redirect(url.redirectURL)
}

async function getAnalytics(req,res){
    const shortId=req.params.shortId;
    const url = await URL.findOne({
        shortId:shortId
    })
    if(!url){
        return res.status(404).json({
            error:"short url not found"
        })
    }
    return res.json({

        shortId: url.shortId,

        redirectURL: url.redirectURL,

        totalClicks: url.totalClicks,

        clickHistory: url.clickHistory

    });

}

module.exports={
    createShortURL,

    redirectToURL,

    getAnalytics
}
