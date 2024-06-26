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
exports.chatController = void 0;
class chatController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    accessChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('1');
                const userId = req.params.userId;
                const currUser = req.user._id;
                console.log(currUser, 'current user');
                const result = yield this.interactor.accessChat(userId, currUser);
                res.json(result);
            }
            catch (error) {
                console.error('Error accessing chat:', error);
                res.status(500).json({ message: 'Error accessing chat' });
            }
        });
    }
    fetchChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('111', req.user);
                const userId = req.user._id;
                console.log(userId);
                const chats = yield this.interactor.fetchChat(userId);
                res.status(200).json(chats);
            }
            catch (error) {
                res.status(500).json({ message: 'Error accessing chat' });
            }
        });
    }
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('11');
                var { groupName, users } = req.body;
                const adminId = req.user._id;
                console.log('groupName', groupName, users);
                const groupCreated = yield this.interactor.createGroup(groupName, users, adminId);
                return res.status(200).json(groupCreated);
            }
            catch (error) {
                console.log('Error creating group:', error);
                return res.status(500).json({ message: 'Failed to create group' });
            }
        });
    }
    renameGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId, newName } = req.body;
                const isGroupNameUpdated = yield this.interactor.renameGroup(groupId, newName);
                return res.status(200).json(isGroupNameUpdated);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to rename group' });
            }
        });
    }
    addToGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { users } = req.body;
                const groupId = req.params.groupId;
                const UpdatedGroup = yield this.interactor.addToGroup(groupId, users);
                return res.status(200).json(UpdatedGroup);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to add to group' });
            }
        });
    }
    removeFromGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { users } = req.body;
                const groupId = req.params.groupId;
                const UpdatedGroup = yield this.interactor.removeFromGroup(groupId, users);
                return res.status(200).json(UpdatedGroup);
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to add to group' });
            }
        });
    }
    deleteGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = req.params.groupId;
                const isGroupDeleted = yield this.interactor.deleteGroup(groupId);
                return res.status(200).json({ success: true });
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to delete group' });
            }
        });
    }
}
exports.chatController = chatController;
