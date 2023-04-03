"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    fullname: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        lowercase: true,
        required: true,
        enum: ['guest', 'admin'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true,
        min: 18
    }
}, { timestamps: true });
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
