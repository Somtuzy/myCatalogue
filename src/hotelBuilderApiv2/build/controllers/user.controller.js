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
const service_1 = __importDefault(require("../services/service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_service_1 = require("../services/bcrypt.service");
const userService = new service_1.default(user_model_1.default);
class UserController {
    // Updating a user
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, username, email, password, newPassword, age } = req.body;
                const id = req.params.id;
                const user = req.user;
                const reqUserId = user.id;
                // Checks if user already exists
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).json({
                        message: `This user does not exist`,
                        success: false
                    });
                }
                if (reqUserId !== existingUser._id.toString())
                    return res.status(403).json({
                        message: `You cannot update this user`,
                        success: false
                    });
                // Updates the user based on what was provided
                const data = {};
                if (fullname)
                    data.fullname = fullname;
                if (username)
                    data.username = username;
                if (email)
                    data.email = email;
                if (age)
                    data.age = age;
                if (!password && newPassword)
                    return res.status(401).json({
                        message: `Please input your current password`,
                        success: false
                    });
                if (password && !newPassword)
                    return res.status(401).json({
                        message: `Please input your new password`,
                        success: false
                    });
                if (password && newPassword) {
                    const isValid = yield (0, bcrypt_service_1.verifyPassword)(password, existingUser.password);
                    if (!isValid)
                        return res.status(400).json({
                            message: `Password is incorrect`,
                            success: false
                        });
                    const updatedPassword = yield (0, bcrypt_service_1.hashPassword)(newPassword);
                    data.password = updatedPassword ? updatedPassword : null;
                }
                let updatedUser;
                updatedUser = yield userService.edit(id, data);
                updatedUser = yield userService.getOne({ _id: updatedUser._id });
                const message = {};
                // Sends a success message and displays the updated user
                if (data.fullname)
                    message.fullname = `Updated successfully!`;
                if (data.username)
                    message.username = `Updated successfully!`;
                if (data.email)
                    message.email = `Updated successfully!`;
                if (data.age)
                    message.age = `Updated successfully!`;
                if (data.password)
                    message.password = `Changed successfully!`;
                return res.status(200).json({
                    message: message,
                    success: true
                });
            }
            catch (err) {
                return res.status(500).json({
                    message: err.message,
                    success: false
                });
            }
        });
    }
    // Deleting a user
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = req.user;
                const reqUserId = user.id;
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    });
                }
                if (reqUserId !== existingUser._id.toString())
                    return res.status(403).json({
                        message: `You cannot update this user`,
                        success: false
                    });
                // Deletes the user
                const deletedUser = yield userService.delete(id);
                // Sends a success message and displays the deleted user
                return res.status(200).send({
                    success: true,
                    message: 'User deleted successfully!',
                    data: deletedUser
                });
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
    // Getting one user by id
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const existingUser = yield userService.getOne({ _id: id });
                // Sends a message if the specified user does not exist
                if (!existingUser) {
                    return res.status(404).send({
                        success: false,
                        message: 'This user does not exist'
                    });
                }
                // Sends a success message and displays user
                return res.status(200).send({
                    success: true,
                    message: 'User fetched successfully!',
                    data: existingUser
                });
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
    // Getting all users
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAll({});
                // Sends a message if no users exist
                if (!users) {
                    return res.status(404).send({
                        success: false,
                        message: 'There are no users on your database'
                    });
                }
                else {
                    // Sends a success message and displays users
                    return res.status(200).send({
                        success: true,
                        message: 'Users fetched successfully!',
                        data: users
                    });
                }
            }
            catch (err) {
                return res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
}
exports.default = new UserController();
