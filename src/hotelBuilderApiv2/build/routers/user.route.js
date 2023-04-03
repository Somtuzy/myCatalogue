"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_login_1 = require("../controllers/user.login");
const user_signup_1 = __importDefault(require("../controllers/user.signup"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
router.route('/users/:id')
    .patch(authenticate_1.default, user_controller_1.default.editUser)
    .delete(authenticate_1.default, user_controller_1.default.deleteUser)
    .get(authenticate_1.default, user_controller_1.default.getUser);
router.get('/users', authenticate_1.default, authorize_1.default, user_controller_1.default.getUsers);
router.route('/signup')
    .post(validate_1.validateUserInputs, user_signup_1.default);
router.route('/login')
    .post(user_login_1.login);
exports.default = router;
