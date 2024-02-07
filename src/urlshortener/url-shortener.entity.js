const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  original_url: {
    type: String,
    required: true,
    trim: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
},
{
  timestamps: true,
  strict: true,
});

module.exports.urlModel = mongoose.model("UrlModel", urlSchema);