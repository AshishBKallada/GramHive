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
exports.StoryRepositoryimpl = void 0;
const followers_1 = __importDefault(require("../../data/data-sources/mongodb/models/followers"));
const story_1 = __importDefault(require("../../data/data-sources/mongodb/models/story"));
const mongoose_1 = __importDefault(require("mongoose"));
class StoryRepositoryimpl {
    addStory(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addStory = yield story_1.default.create({ user: userId, story: imageUrl });
                return addStory ? true : false;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    getStories(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const following = yield followers_1.default.find({ followed_id: userId });
                const followedUserIds = following.map((user) => user.follower_id);
                const stories = yield story_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { user: { $in: followedUserIds } },
                                { user: new mongoose_1.default.Types.ObjectId(userId) },
                            ],
                        },
                    },
                    {
                        $group: {
                            _id: '$user',
                            stories: {
                                $push: {
                                    story: '$story',
                                    createdAt: '$createdAt',
                                    seenBy: '$seenBy',
                                },
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: '_id',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                    {
                        $project: {
                            user: {
                                _id: 1,
                                username: 1,
                                name: 1,
                                email: 1,
                                image: 1,
                            },
                            stories: 1,
                        },
                    },
                ]);
                return stories;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
exports.StoryRepositoryimpl = StoryRepositoryimpl;
