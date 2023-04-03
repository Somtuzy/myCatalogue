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
exports.login = exports.userService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const service_1 = __importDefault(require("../services/service"));
const bcrypt_service_1 = require("../services/bcrypt.service");
const jwt_service_1 = require("../services/jwt.service");
const userService = new service_1.default(user_model_1.default);
exports.userService = userService;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        let user;
        // Checks for what a user is logging in with
        if (!email && !username)
            return res.status(404).send({
                message: `Please input your username or email to continue`
            });
        if (!password)
            return res.status(404).send({
                message: `Please input your password to continue`
            });
        if (email && password)
            user = yield userService.getOne({ email });
        if (username && password)
            user = yield userService.getOne({ username });
        // Sends a message if the user doesn"t exist
        if (!user || user === null) {
            return res.status(404).send({
                message: `User does not exist, would you like to sign up?`
            });
        }
        // Checks if the password input by the client matches the protected password of the returned user
        const isValid = yield (0, bcrypt_service_1.verifyPassword)(password, user.password);
        // Sends a message if the input password doesn't match
        if (!isValid) {
            return res.status(400).send({
                message: 'Incorrect password, please retype your password',
                status: 'failed'
            });
        }
        // Stores the returned user's unique id and role in an object to generate an authentication token for them 
        const useForToken = {
            id: user._id,
            username: user.username
        };
        // Generates a token for the user 
        const token = (0, jwt_service_1.generateToken)(useForToken);
        // This saves the token as a cookie for the duration of its validity just to simulate how the request header works for the purpose of testing.
        res.cookie('token', token, { httpOnly: true });
        // Removes password from output
        if (user && user.password) {
            user.password = null;
        }
        // Sends success message on the console
        console.log(`Token successfully generated for ${user}`);
        // Sends the token to the client side for it to be set as the request header using axios
        res.json({ token, user });
        next();
    }
    catch (err) {
        return res.status(400).send({
            message: err,
            status: 'failed'
        });
    }
});
exports.login = login;
