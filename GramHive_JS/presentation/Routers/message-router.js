"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const message_repository_1 = require("../../domain/repositories/message-repository");
const messageInteractor_1 = require("../../domain/usecases/messageInteractor");
const message_controller_1 = require("../Controllers/message-controller");
const fileshare_multer_1 = __importDefault(require("../../middlewares/fileshare-multer"));
const FileUploadMiddleware_1 = require("../../middlewares/FileUploadMiddleware");
const audioUploadMiddleware_1 = require("../../middlewares/audioUploadMiddleware");
const repository = new message_repository_1.MessageRepositoryImpl();
const interactor = new messageInteractor_1.MessageInteractorImpl(repository);
const controller = new message_controller_1.messageController(interactor);
const messageRouter = (0, express_1.Router)();
messageRouter.post('/audio/:chatId', authMiddleware_1.default, audioUploadMiddleware_1.audioUploadMiddleware, controller.onShareAudio.bind(controller));
messageRouter.route('/:chatId').post(authMiddleware_1.default, controller.onSendMessage.bind(controller));
messageRouter.route('/:chatId').get(authMiddleware_1.default, controller.onAllMessages.bind(controller));
messageRouter.route('/delete/:Id').put(authMiddleware_1.default, controller.onDeleteMessage.bind(controller));
messageRouter.post('/sharefile/:chatId', fileshare_multer_1.default, FileUploadMiddleware_1.FileUploadMiddleware, authMiddleware_1.default, controller.onShareFiles.bind(controller));
exports.default = messageRouter;
