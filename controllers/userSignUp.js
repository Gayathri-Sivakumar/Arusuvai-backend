const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  const { email, password, confirmPassword, name, profilePic } = req.body;
  try {
    if (!email || !password || !confirmPassword || !name) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      return res.status(500).json({ error: "Failed to hash password" });
    }
    const user = await userModel.create({
      email,
      password: hashedPassword,
      name,
      profilePic,
    });

    res.status(201).json({
      data: user,
      message: "User created successfully",
      success: true,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = userSignUpController;
