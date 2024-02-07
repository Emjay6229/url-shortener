const {
  generateShortUrl,
  redirectToLongUrl,
  getAllShortUrls,
  deleteShortUrl,
  deleteAllUrl,
} = require("./url-shortener");

const urlRouter = require("express").Router();

urlRouter.post("/generate-url", generateShortUrl);
urlRouter.get("/:domain/:shortId", redirectToLongUrl);
urlRouter.get("/get-url", getAllShortUrls);
urlRouter.delete("/delete", deleteShortUrl);
urlRouter.delete("/delete", deleteAllUrl);

module.exports = { urlRouter };