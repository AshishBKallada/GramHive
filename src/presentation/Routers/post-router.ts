import express from 'express';
import userAuth from "../../Middlewares/authMiddleware";
import uploadToCloudinary from "../../Middlewares/cloudinaryConfig";
import upload from "../../Middlewares/multerConfig";

import { PostController } from '../Controllers/post-controller';
import { PostRepositoryImpl } from '../../domain/repositories/post-repository';
import { postInteractorImpl } from '../../domain/usecases/postInteractor';
import { NotificationRepositoryImpl } from '../../domain/repositories/notification-repository';
import { ChatRepositoryImpl } from '../../domain/repositories/chat-repository';
import { MessageRepositoryImpl } from '../../domain/repositories/message-repository';

const repository = new PostRepositoryImpl()
const NotiRepository = new NotificationRepositoryImpl();
const chatRepository = new ChatRepositoryImpl();
const messageRepository = new MessageRepositoryImpl();
const interactor = new postInteractorImpl(repository, NotiRepository,chatRepository,messageRepository)
const controller = new PostController(interactor)

const postRouter = express.Router();


postRouter.post('/addpost/:userId', upload, uploadToCloudinary, controller.addPost.bind(controller));
postRouter.post('/:postId/like', controller.addLike.bind(controller));
postRouter.put('/:postId/unlike', userAuth, controller.removeLike.bind(controller));
postRouter.get('/:postId/likes', controller.getLikes.bind(controller));
postRouter.get('/home/:userId', controller.getHomePosts.bind(controller))
postRouter.delete('/:postId/delete', controller.deletePost.bind(controller));
postRouter.post('/:postId/save/:author', controller.savePost.bind(controller));
postRouter.post('/:postId/unsave/:author', controller.onUnsavePost.bind(controller));
postRouter.post('/report/:postId', controller.onReportPost.bind(controller));
postRouter.put('/update/:postId', controller.onPostUpdate.bind(controller));
postRouter.post('/share/:postId', userAuth,controller.onSharePost.bind(controller));

export default postRouter;
