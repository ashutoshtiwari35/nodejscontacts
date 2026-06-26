const asyncHandler = require("express-async-handler");
const Candidate = require("../models/candidateModels");
const NewUser = require("../models/newUserModels");

const checkAdminRole = asyncHandler(async(userId) =>{
    const user = await NewUser.findById(userId);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    return user.role === "admin";
}); 

const addCandidate = asyncHandler(async(req, res) =>{
    const { name, phone, age, party} = req.body;
    if(!await checkAdminRole(req.user.id)) {
        res.status(403);
        throw new Error("User does not have admin role");
    }
    if(!name || !phone || !age || !party) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const candidate = await Candidate.create({
        name,
        phone,
        age,
        party
    });
    if(candidate) {
        res.status(201).json({_id: candidate.id, name: candidate.name})
    }
    else {
        res.status(400);
        throw new Error("Candidate data is not valid");
    }
});

const updateCandidate = asyncHandler(async(req, res) =>{
    if(!await checkAdminRole(req.user.id)) {
        res.status(403);
        throw new Error("User does not have admin role");
    }
    const candidate = await Candidate.findById(req.params.id);
    if(!candidate) { 
        res.status(404);
        throw new Error("Candidate not found");
    }
    const updatedCandidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )
    res.status(200).json(updatedCandidate);
});

const deleteCandidate = asyncHandler(async(req, res) =>{
    if(!await checkAdminRole(req.user.id)) {
        res.status(403);
        throw new Error("User does not have admin role");
    }
    const candidate = await Candidate.findById(req.params.id);
    if(!candidate) {
        res.status(404);
        throw new Error("Candidate not found");
    }
    await candidate.deleteOne({ _id: req.params.id });
    res.status(200).json(candidate);
});


module.exports = { addCandidate, updateCandidate, deleteCandidate };