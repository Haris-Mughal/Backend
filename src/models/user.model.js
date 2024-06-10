// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({}, {})

import mongoose, { Schema } from "mongoose";

import jwt, { sign } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10);
    next();

    // if (this.isModified("password")) {
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
    // next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    jwt: sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
