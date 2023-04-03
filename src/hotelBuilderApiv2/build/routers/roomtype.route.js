"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const validate_1 = require("../middlewares/validate");
const roomtype_controller_1 = __importDefault(require("../controllers/roomtype.controller"));
const router = (0, express_1.Router)();
router.route('/:id')
    .patch(authenticate_1.default, authorize_1.default, roomtype_controller_1.default.editRoomType)
    .delete(authenticate_1.default, authorize_1.default, roomtype_controller_1.default.deleteRoomType)
    .get(authenticate_1.default, roomtype_controller_1.default.getRoomType);
router.get('/', authenticate_1.default, roomtype_controller_1.default.getRoomTypes);
router.route('/create')
    .post(authenticate_1.default, authorize_1.default, validate_1.validateRoomTypeInputs, roomtype_controller_1.default.addRoomType);
exports.default = router;
