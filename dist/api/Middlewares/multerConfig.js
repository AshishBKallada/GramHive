"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const multerUploads = (0, multer_1.default)({ storage }).single('image');
exports.multerUploads = multerUploads;
console.log();
