const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModels");
const NewUser = require("../models/newUserModels");


const getListOfCandidates = asyncHandler(async(req, res) =>{
   const candidates = await Candidate.find();  
   res.status(200).json(candidates);
});

const giveVotesToCandidates = asyncHandler(async(req, res) =>{
    const candidate = await Candidate.findById(req.params.id);
    if(!candidate) {
        res.status(404);
        throw new Error("Candidate not found");
    }
    const user = await NewUser.findById(req.user.id);
    if(!user) { 
        res.status(404);
        throw new Error("User not found");
    }
    if(user.isVoted) {
        res.status(400);
        throw new Error("User has already voted");
    }
    if(user.role === "admin") {
        res.status(403);
        throw new Error("Admin cannot vote");
    }
    candidate.votes.push({user: user.id})
    candidate.voteCount++;
    await candidate.save();

    // updated the user document
    user.isVoted = true;
    await user.save();

    res.status(200).json({message: "Vote given successfully"});
});

const getVoteCountForCandidates = asyncHandler(async(req, res) =>{
  const candidate = await Candidate.find().sort({ voteCount: 'desc'})
  

  const voteRecord = candidate.map((data) =>{
    return {
        party: data.party,
        count: data.voteCount
    }
  });

  res.status(200).json(voteRecord);

});

module.exports = { getListOfCandidates, giveVotesToCandidates, getVoteCountForCandidates };