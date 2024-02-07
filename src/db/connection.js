const mongoose = require("mongoose");

async function connect(mongoDbConnectionString) {
    try {
        await mongoose.connect(mongoDbConnectionString);
        console.log("connected to mongodb successfully");
    } catch(err) {
        console.error("error connecting to db", err.message);
    }
}

module.exports = { connect };