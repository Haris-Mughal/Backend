// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({}, {})

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String, //cloudnary sw url
            required: true,
        },
        coverImage: {
            type: String, //cloudnary sw url
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
