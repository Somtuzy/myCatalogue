"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
// Connects to the database
const connect = (Uri) => {
    mongoose_1.default
        .connect(Uri, {
        dbName: "hotelBuilder",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connected to your database'))
        .catch((err) => console.log(err, ':', err.message));
};
exports.default = connect;
