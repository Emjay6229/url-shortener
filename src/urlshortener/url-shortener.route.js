const { generateShortUrl, redirectToLongUrl, getAllShortUrls, deleteShortUrl, deleteAllUrl } = require("./url-shortener");
const urlRouter = require("express").Router();

urlRouter.post("/generate-url", generateShortUrl);
urlRouter.get("/:domain/:shortId", redirectToLongUrl);
urlRouter.get("/getUrl", getAllShortUrls);
urlRouter.delete("/del-url", deleteShortUrl);
urlRouter.delete("/delAll", deleteAllUrl);

module.exports = { urlRouter };