import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    gameName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        unique: false
    },
    walletBalance: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    },
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }
}, {
    timestamps: true
})

const Users = mongoose.model("users", userSchema)

export default Users;