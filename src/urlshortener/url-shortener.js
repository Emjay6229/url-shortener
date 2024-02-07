const { config } = require("dotenv");
const { customAlphabet } = require("nanoid");
const { urlModel } = require("./url-shortener.entity");

config();

exports.generateShortUrl = async function (req, res) {
  const { original_url } = req.body;
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUUVWXYZabcdefghijklmnopqrstuuvwxyz1234567890", 11);
  const shortId = nanoid(7);
  const domain = process.env.DOMAIN;

  try {
    if (!domain) return res.json("Domain is undefined");

    const checkForExistingId = await urlModel
      .findOne({ short_url: shortId })
      .select("short_url");

    while (checkForExistingId) 
      shortId = nanoid(7);

    const newUrl = new urlModel({
      original_url,
      short_url: shortId,
    });

    await newUrl.save();
    return res
      .status(200)
      .json(`Here is your shortened url: https://${domain}/${shortId}`);
  } catch (err) {
    console.error(err.message);
    console.trace(err.stack);
    return res.status(400).json(`Internal Server error: ${err.message}`);
  }
};

exports.redirectToLongUrl = async function (req, res) {
  const url = req.url;
  const shortId = url.substring(1).split("/")[1];

  try {
    const verify =
      (await urlModel.findOne({ short_url: shortId })) ??
      "couldn't not find url object.";
    const original_url = verify.original_url;
    return res.redirect(301, original_url);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`);
  }
};

exports.getAllShortUrls = async function (req, res) {
  try {
    const arrayOfUrl =
      (await urlModel.find()) ?? "couldn't not find url object.";
    return res.status(200).json(arrayOfUrl);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`);
  }
};

exports.deleteShortUrl = async function (req, res) {
  const { url } = req.body;

  try {
    const shortId = url.split("/")[3];
    await urlModel.findOneAndDelete({ short_url: shortId });
    return res.status(200).json(`${url} has been deleted`);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`);
  }
};

exports.deleteAllUrl = async function (req, res) {
  try {
    await urlModel.deleteMany();
    return res.status(200).json(`url list has been deleted`);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`);
  }
};
