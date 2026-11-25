//this handles db connection to mongo db
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");

async function connect() {
  await mongoose.connect(process.env.MONGO_URI);
}
//this disconnects from db when done
async function disconnect() {
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
