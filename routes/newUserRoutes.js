const express = require("express");
const router = express.Router();
const { signupUser, loginUser, checkProfile, updateProfile } = require("../controllers/newUserController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/checkprofile", validateToken, checkProfile);
router.put("/updateprofile/:id", validateToken, updateProfile);

module.exports = router;