
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async(req,res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        password: hashedPassword,
        email
    });
    console.log("User created successfully: ", newUser);
    if(newUser) {
        res.status(201).json({_id: newUser.id, email: newUser.email})
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({ message: "Register the user" })
});


//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    //compare password with has password
    if(user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m'}
            
        );
        res.status(200).json({ accessToken })
    }
    else {
        res.status(401);
        throw new Error("Email or password is incorrect");
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async(req,res) =>{
    res.json(req.user)
});



module.exports = { registerUser, loginUser, currentUser };