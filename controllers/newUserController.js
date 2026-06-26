const asyncHandler = require('express-async-handler');
const NewUser = require("../models/newUserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = asyncHandler(async(req, res) =>{
    const { uniqueId, name, email, age, mobile, password, address, role} = req.body;
    if(!uniqueId || !name || !email || !password || !address || !role) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await NewUser.create({
        uniqueId,
        name,
        email,
        age,
        mobile,
        password: hashedPassword,
        address,
        role
    });
    if(newUser) {
        res.status(201).json({_id: newUser.id, uniqueId: newUser.uniqueId})
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asyncHandler(async(req,res) =>{
    const { uniqueId, password} = req.body;

    if(!uniqueId || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const newUser = await NewUser.findOne({uniqueId});
    if(newUser && await bcrypt.compare(password, newUser.password)){
         const accessToken = jwt.sign(
            {
                user:{
                    uniqueId: newUser.uniqueId,
                    name: newUser.name,
                    email: newUser.email,
                    age: newUser.age,
                    mobile: newUser.mobile,
                    address: newUser.address,
                    id: newUser.id,
                    role: newUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50m'}
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("id or password is incorrect");
    }
});

const checkProfile = asyncHandler(async(req, res) =>{
    res.json(req.user);
});

const updateProfile = asyncHandler(async(req, res) =>{
   const user = await NewUser.findById(req.params.id);
   if(!user) {
    res.status(404);
    throw new Error("User not found");
   }
   if(user.id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user's details");
    }
    const { password, uniqueId, role, ...safeUpdates } = req.body;
    const updatedUser = await NewUser.findByIdAndUpdate(
        req.params.id,
        safeUpdates,
        { new: true }
    )
    res.status(200).json(updatedUser);
});

module.exports = { signupUser, loginUser, checkProfile, updateProfile };