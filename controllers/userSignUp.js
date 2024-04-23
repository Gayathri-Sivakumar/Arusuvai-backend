const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  const { email, password, confirmpassword, name, profilePic } = req.body;
  try {
    if (!email || !password || !name || !confirmpassword) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    if (password != confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      return res.status(500).json({ error: "Failed to hash password" });
    }
    const user = await userModel.create({
      ...req.body,
      role: "general user",
      password: hashedPassword,
    });

    res.status(201).json({
      data: user,
      message: "User created successfully",
      success: true,
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user: " + error.message });
  }
}

module.exports = userSignUpController;
