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
const roomtype_model_1 = __importDefault(require("../models/roomtype.model"));
const roomTypeService = new service_1.default(roomtype_model_1.default);
class RoomTypeController {
    addRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                // Check if roomtype exists
                const existingRoomType = yield roomTypeService.getOne({ name: name });
                if (existingRoomType) {
                    // Send a forbidden message if roomtype already exists
                    return res.status(403).send({
                        success: false,
                        message: 'Roomtype already exists!'
                    });
                }
                // Creates roomtype and sends a success message
                const newRoomType = yield roomTypeService.create({ name: name, description: description });
                yield newRoomType.save();
                return res.status(201).send({
                    success: true,
                    message: 'Roomtype created successfully!',
                    data: newRoomType
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
    editRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypeName = req.params.name;
                const { name, description } = req.body;
                // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
                let input = roomTypeName.replace(/[- ]/g, "[- ]?");
                let result = new RegExp("^" + input + "$");
                let regexName = { $regex: result, $options: 'i' };
                const existingRoomType = yield roomTypeService.getOne({ name: regexName });
                // Sends a message if the specified roomtype does not exist
                if (!existingRoomType) {
                    return res.status(404).send({
                        success: false,
                        message: 'This roomtype does not exist'
                    });
                }
                // Updates the roomtype
                const updatedRoomType = yield roomTypeService.edit(existingRoomType, { name: name, description: description });
                // Sends a success message and displays the updated roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype updated successfully!',
                    data: updatedRoomType
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
    // Deleting a roomtype
    deleteRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypeName = req.params.name;
                // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
                let input = roomTypeName.replace(/[- ]/g, "[- ]?");
                let result = new RegExp("^" + input + "$");
                let regexName = { $regex: result, $options: 'i' };
                const existingRoomType = yield roomTypeService.getOne({ name: regexName });
                // Sends a message if the specified roomtype does not exist
                if (!existingRoomType) {
                    return res.status(404).send({
                        success: false,
                        message: 'This roomtype does not exist'
                    });
                }
                // Deletes the roomtype
                const deletedRoomType = yield roomTypeService.delete(existingRoomType);
                // Sends a success message and displays the deleted roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype deleted successfully!',
                    data: deletedRoomType
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
    // Getting one roomtype
    getRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypeName = req.params.name;
                // Creates a regex pattern to allow a user to search for a roomtype in a case sensitive manner and with a hyphen between every word for compound roomtype names 
                let input = roomTypeName.replace(/[- ]/g, "[- ]?");
                let result = new RegExp("^" + input + "$");
                let regexName = { $regex: result, $options: 'i' };
                const existingRoomType = yield roomTypeService.getOne({ name: regexName });
                // Sends a message if the specified roomtype does not exist
                if (!existingRoomType) {
                    return res.status(404).send({
                        success: false,
                        message: 'This roomtype does not exist'
                    });
                }
                // Sends a success message and displays roomtype
                return res.status(200).send({
                    success: true,
                    message: 'Roomtype fetched successfully!',
                    data: existingRoomType
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
    // Getting all roomtypes
    getRoomTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypes = yield roomTypeService.getAll({});
                // Sends a message if no roomtypes exists
                if (!roomTypes) {
                    return res.status(404).send({
                        success: false,
                        message: 'There are no roomtypes on your database'
                    });
                }
                // Sends a success message and displays roomtypes
                return res.status(200).send({
                    success: true,
                    message: 'Roomtypes fetched successfully!',
                    data: roomTypes
                });
            }
            catch (err) {
                res.send({
                    error: err,
                    message: err.message
                });
            }
        });
    }
}
exports.default = new RoomTypeController();
