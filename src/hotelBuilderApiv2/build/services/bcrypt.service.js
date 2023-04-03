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
exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const rounds = parseFloat(process.env.ROUNDS);
// Masks the passsword with random characters to protect user data
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(rounds);
    password = yield bcrypt_1.default.hash(password, salt);
    return password;
});
exports.hashPassword = hashPassword;
// Confirms the input password is the same password that was masked when the user signed up
const verifyPassword = (userPassword, hashedUserPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = yield bcrypt_1.default.compare(userPassword, hashedUserPassword);
    return isValid;
});
exports.verifyPassword = verifyPassword;
