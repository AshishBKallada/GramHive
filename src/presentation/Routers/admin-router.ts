import express from "express";
import { AdminController } from "../Controllers/admin-controller";
import { AdminRepositoryImpl } from "../../domain/repositories/admin-repository";
import { AdminInteractorImpl } from "../../domain/usecases/adminInteractor";
import { AuthService } from "../../domain/services/admin/AuthService";

const repository = new AdminRepositoryImpl();
const authService = new AuthService();
const interactor = new AdminInteractorImpl(repository, authService)
const controller = new AdminController(interactor)

const adminRouter = express.Router();

adminRouter.post('/login', controller.onLogin.bind(controller))
adminRouter.get('/users', controller.onGetUsers.bind(controller));
adminRouter.get('/blockuser/:userId', controller.onBlockUser.bind(controller));
adminRouter.get('/reviews/:filter', controller.onGetReviews.bind(controller));
adminRouter.get('/postreports', controller.onPostReports.bind(controller));
adminRouter.post('/banpost/:postId', controller.onPostBan.bind(controller));
adminRouter.get('/userreports', controller.onUserReports.bind(controller));
adminRouter.get('/transactions', controller.onGetTransactions.bind(controller));
adminRouter.get('/dashboard', controller.onDashboard.bind(controller));
adminRouter.get('/chartone', controller.onChartOne.bind(controller));
adminRouter.get('/charttwo', controller.onChartTwo.bind(controller));



export default adminRouter;

