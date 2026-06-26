const express = require("express");
const router = express.Router();
const { getListOfCandidates, giveVotesToCandidates, getVoteCountForCandidates } = require("../controllers/candidateController");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/getlistofcandidates", validateToken, getListOfCandidates);
router.post("/givevotes/:id", validateToken,giveVotesToCandidates);
router.get("/getvote-count", validateToken, getVoteCountForCandidates);

module.exports = router;