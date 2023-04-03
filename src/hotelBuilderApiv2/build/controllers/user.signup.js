"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const service_1 = __importDefault(require("../services/service"));
const bcrypt_service_1 = require("../services/bcrypt.service");
const jwt_service_1 = require("../services/jwt.service");
const userService = new service_1.default(user_model_1.default);
// Registers a user and gives them a token
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, email, password, role, age } = req.body;
        // Checks for existing user
        const existingUser = yield userService.getOne({ username: username, email: email });
        if (existingUser) {
            // Gives forbidden message
            return res.status(403).send({
                message: 'User already exists',
                status: 'failed'
            });
        }
        // Hashes the user password for extra protection
        const safePassword = yield (0, bcrypt_service_1.hashPassword)(password);
        const user = yield userService.create({ fullname, username, email, password: safePassword, role, age });
        // Stores the returned user's unique id and role in an object to generate an authentication token for them 
        const useForToken = {
            id: user._id,
            role: user.role
        };
        // Generates a token for the user 
        const token = (0, jwt_service_1.generateToken)(useForToken);
        // Saves the user
        yield user.save();
        // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
        res.cookie('token', token, { httpOnly: true });
        // Removes password from output
        if (user && user.password) {
            user.password = null;
        }
        // Sends success message on the console
        console.log(`Token successfully generated for ${user}`);
        // Sends the token to the client side for it to be set as the request header using axios
        res.json({ userToken: token, user });
        next();
    }
    catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        });
    }
});
exports.default = signup;
