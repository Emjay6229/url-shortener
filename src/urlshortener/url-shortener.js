const { config } = require("dotenv");
const { nanoid } = require("nanoid");
const {urlModel} = require("./url-shortener.entity");

config();

exports.generateShortUrl = async function (req, res) {
  const { original_url } = req.body;
  const shortid = nanoid(11);
  const domain = process.env.DOMAIN;

  const short_url = `${domain}/${shortid}`;

  try {
    if (!domain) return res.json("Domain is undefined");

    const newUrl = new urlModel({
      original_url,
      short_url,
    });

    await newUrl.save();
    return res.status(200).json(`Here is your shortened url: https://${short_url}`);
  } catch (err) {
    console.error(err.message);
    return res.status(400).json(`Internal Server error: ${err.message}`)
  }
};

exports.redirectToLongUrl = async function (req, res) {
    let short_url = req.url;
    short_url = short_url.substring(1);
    console.log(short_url);

    try {
      const verify = await urlModel.findOne({ short_url }) ?? "couldn't not find url object.";
      const original_url = verify.original_url;
      console.log(original_url);
      return res.redirect(301, original_url);
    } catch(err) {
      console.error(err.message);
      return res.status(500).json(`Internal Server error: ${err.message}`)
    }
}

exports.deleteShortUrl = async function (req, res) {
  const short_url = req.body;

  try {
    await urlModel.findOneAndDelete({ short_url });
    return res.status(200).json(`https:/${short_url} has been deleted`);
  } catch(err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`)
  }
}

exports.deleteAllUrl = async function (req, res) {
  try {
    await urlModel.deleteMany();
    return res.status(200).json(`url list has been deleted`);
  } catch(err) {
    console.error(err.message);
    return res.status(500).json(`Internal Server error: ${err.message}`)
  }
}


exports.getAllShortUrls = async function(req, res) {
  const arrayOfUrl = await urlModel.find() ?? "couldn't not find url object.";
  return res.status(200).json(arrayOfUrl);
}