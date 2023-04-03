"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Accesses the secret key used for token generation and the duration of the token
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Getting the secret key and duration of token from the .env
const secretKey = process.env.JWT_SECRET_KEY;
const duration = process.env.JWT_EXPIRES_IN;
// Generates a token that authenticates a user whenever they sign in. Without this token, a user isn't recognised as authentic
const generateToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: duration });
    return token;
};
exports.generateToken = generateToken;
// Verifies the authenticity of a user by checking the validity of the user's token when they make a request
const verifyToken = (payload) => {
    const validToken = jsonwebtoken_1.default.verify(payload, secretKey);
    return validToken;
};
exports.verifyToken = verifyToken;
