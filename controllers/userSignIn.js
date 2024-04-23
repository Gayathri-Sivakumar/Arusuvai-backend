const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = await jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, tokenOption).json({
      data: { token },
      message: "User signed in successfully",
      success: true,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to sign in user: " + error.message });
  }
}
module.exports = userSignInController;
