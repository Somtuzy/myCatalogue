"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoomTypeInputs = exports.validateRoomInputs = exports.validateUserInputs = void 0;
const joi_1 = __importDefault(require("joi"));
// Checking the user schema fields against pre-set conditions
const userSchema = joi_1.default.object({
    fullname: joi_1.default.string().required(),
    username: joi_1.default.string().required().lowercase(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(30).required(),
    role: joi_1.default.string().required(),
    age: joi_1.default.number().integer().min(18).max(99).required()
});
// Checking the room schema fields against pre-set conditions
const roomSchema = joi_1.default.object({
    codename: joi_1.default.string().lowercase().required(),
    roomtype: joi_1.default.required(),
    price: joi_1.default.number().required(),
    description: joi_1.default.string().required()
});
// Checking the roomtype schema fields against pre-set conditions
const roomTypeSchema = joi_1.default.object({
    name: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().required()
});
// Catching required fields errors when creating a user
const validateUserInputs = (req, res, next) => {
    try {
        const validateInput = userSchema.validate(req.body);
        if (validateInput.error) {
            return res.status(400).send({
                success: false,
                status: 'failed',
                errormessage: validateInput.error.details[0].message
            });
        }
        else {
            console.log("Validated successfully");
            next();
        }
    }
    catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        });
    }
};
exports.validateUserInputs = validateUserInputs;
// Catching required fields errors when creating a user
const validateRoomInputs = (req, res, next) => {
    try {
        const validateInput = roomSchema.validate(req.body);
        if (validateInput.error) {
            return res.status(400).send({
                success: false,
                status: 'failed',
                errormessage: validateInput.error.details[0].message
            });
        }
        else {
            console.log("Validated successfully");
            next();
        }
    }
    catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        });
    }
};
exports.validateRoomInputs = validateRoomInputs;
// Catching required fields errors when creating a user
const validateRoomTypeInputs = (req, res, next) => {
    try {
        const validateInput = roomTypeSchema.validate(req.body);
        if (validateInput.error) {
            return res.status(400).send({
                success: false,
                status: 'failed',
                errormessage: validateInput.error.details[0].message
            });
        }
        else {
            console.log("Validated successfully");
            next();
        }
    }
    catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        });
    }
};
exports.validateRoomTypeInputs = validateRoomTypeInputs;
