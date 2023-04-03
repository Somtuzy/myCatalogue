"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });
const roomTypeModel = (0, mongoose_1.model)("roomtype", roomTypeSchema);
exports.default = roomTypeModel;
