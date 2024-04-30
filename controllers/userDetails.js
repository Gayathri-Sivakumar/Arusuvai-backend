const userModel = require("../models/userModel");

async function userDetailsController(req, res) {
  try {
    // Get user details
    const user = await userModel.findById(req.userId);

    console.log("User details:", user);

    // Respond with user's name and profile picture
    res.status(200).json({
      data: {
        name: user.name,
        pic: user.profilePic,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error.toString(),
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
