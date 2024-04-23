const express = require("express");
const router = express.Router();

const userSignUpController = require("../controllers/userSignUp");
const userSignInController = require("../controllers/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controllers/userDetails");
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);

module.exports = router;
