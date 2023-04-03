"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const roomtype_route_1 = __importDefault(require("./roomtype.route"));
const room_route_1 = __importDefault(require("./room.route"));
const router = (0, express_1.Router)();
router.use('/v1', user_route_1.default);
router.use('/v1/rooms', room_route_1.default);
router.use('/v1/roomtypes', roomtype_route_1.default);
exports.default = router;
