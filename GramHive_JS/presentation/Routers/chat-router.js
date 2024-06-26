"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../Controllers/chat-controller");
const chat_repository_1 = require("../../domain/repositories/chat-repository");
const chatInteractor_1 = require("../../domain/usecases/chatInteractor");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const repository = new chat_repository_1.ChatRepositoryImpl();
const interactor = new chatInteractor_1.chatInteractorImpl(repository);
const controller = new chat_controller_1.chatController(interactor);
const chatRouter = express_1.default.Router();
chatRouter.route('/:userId').get(authMiddleware_1.default, controller.accessChat.bind(controller));
chatRouter.route('/').post(authMiddleware_1.default, controller.fetchChat.bind(controller));
chatRouter.route('/group').post(authMiddleware_1.default, controller.createGroup.bind(controller));
chatRouter.route('/grouprename/:groupId').put(authMiddleware_1.default, controller.renameGroup.bind(controller));
chatRouter.route('/groupadd/:groupId').put(authMiddleware_1.default, controller.addToGroup.bind(controller));
chatRouter.route('/groupremove/:groupId').put(authMiddleware_1.default, controller.removeFromGroup.bind(controller));
chatRouter.route('/deletegroup/:groupId').delete(authMiddleware_1.default, controller.deleteGroup.bind(controller));
exports.default = chatRouter;
