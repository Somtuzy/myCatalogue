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
Object.defineProperty(exports, "__esModule", { value: true });
class Services {
    constructor(Model) {
        this.model = Model;
    }
    create(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new this.model(collection);
        });
    }
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndUpdate({ _id: id }, data, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findByIdAndDelete({ _id: id });
        });
    }
    getOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne(filter);
        });
    }
    getAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(filter);
        });
    }
}
exports.default = Services;
