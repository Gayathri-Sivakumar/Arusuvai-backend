const userModel = require("../models/userModel");

async function userDetailsController(req, res) {
  try {
    //get user details
  } catch (error) {
    res.status(500).json({
      message: error.message || error.toString(),
      error: true,
      success: false,
    });
  }
}
module.exports = userDetailsController;
