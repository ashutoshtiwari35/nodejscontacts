const mongoose = require("mongoose");

const newUserSchema = mongoose.Schema({
    uniqueId: {
        type: String,
        required: [true, "Please add the unique id"],
        unique: [true, "Unique id already taken"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    name: {
        type: String,
        required: [true, "Please add the name"],
    },
    age: {
        type: Number
    },
    address: {
        type: String,
        required: [true, "Please add the address"],
    },
    mobile: {
        type: String,
    },
    password:{
        type: String,
        required: [true, "Please add the password"],
    },
    role: {
        type: String,
        enum: ["admin", "voter"],
        default: "voter"
    },
    isVoted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("NewUser", newUserSchema);