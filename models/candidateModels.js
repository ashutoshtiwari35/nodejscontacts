const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the candidate name"],
    },
    age: {
        type: Number,
        required: [true, "Please add the candidate age"],
    },
    phone: {
        type: String,
        required: [true, "Please add the candidate phone number"],
    },
    party: {
        type: String,
        required: [true, "Please add the candidate icon"],
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: [true, "Please add the user id"],
            },
            votedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0,
    }
},
{
    timestamps: true,
}
);


module.exports = mongoose.model("Candidate", candidateSchema);