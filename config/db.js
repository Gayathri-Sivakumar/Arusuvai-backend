const mongoose = require("mongoose");
async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database");
  }
}
module.exports = connectdb;
