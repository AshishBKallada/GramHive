import express from "express";
import { AdminController } from "../Controllers/admin-controller";
import { AdminRepositoryImpl } from "../../domain/repositories/admin-repository";
import { AdminInteractorImpl } from "../../domain/usecases/adminInteractor";

const repository = new AdminRepositoryImpl()
const interactor = new AdminInteractorImpl(repository)
const controller = new AdminController(interactor)

const adminRouter = express.Router();

adminRouter.post('/login',controller.onLogin.bind(controller))
adminRouter.get('/users',controller.onGetUsers.bind(controller));
adminRouter.get('/blockuser/:userId',controller.onBlockUser.bind(controller));


export default adminRouter;
