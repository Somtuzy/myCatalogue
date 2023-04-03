"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const validate_1 = require("../middlewares/validate");
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const router = (0, express_1.Router)();
router.route('/:id')
    .patch(authenticate_1.default, authorize_1.default, room_controller_1.default.editRoom)
    .delete(authenticate_1.default, authorize_1.default, room_controller_1.default.deleteRoom)
    .get(authenticate_1.default, room_controller_1.default.getRoom);
router.get('/', authenticate_1.default, room_controller_1.default.getRooms);
router.route('/create')
    .post(authenticate_1.default, authorize_1.default, validate_1.validateRoomInputs, room_controller_1.default.addRoom);
exports.default = router;
