const express = require("express");
const router = express.Router();
const { addCandidate, updateCandidate, deleteCandidate } = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");


router.post("/addcandidate", validateToken, addCandidate);
router.put("/updatecandidate/:id", validateToken, updateCandidate);
router.delete("/deletecandidate/:id", validateToken, deleteCandidate);


module.exports = router;