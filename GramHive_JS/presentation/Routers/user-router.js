"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../Controllers/user-controller");
const user_repository_1 = require("../../domain/repositories/user-repository");
const userInteractor_1 = require("../../domain/usecases/userInteractor");
const mailer_1 = require("../../domain/external-libraries/mailer");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const userValidator_1 = require("../../validators/userValidator");
const repository = new user_repository_1.UserRepositoryImpl();
const mailer = new mailer_1.MailerImpl();
const interactor = new userInteractor_1.UserInteractorImpl(repository, mailer);
const controller = new user_controller_1.userController(interactor);
const userRouter = express_1.default.Router();
userRouter.post('/login', userValidator_1.userValidationRules.login, validationMiddleware_1.handleValidationErrors, controller.login.bind(controller));
userRouter.post('/signup', userValidator_1.userValidationRules.signup, validationMiddleware_1.handleValidationErrors, controller.signup.bind(controller));
userRouter.post('/check-email', userValidator_1.userValidationRules.checkEmail, validationMiddleware_1.handleValidationErrors, controller.onCheckEmail.bind(controller));
userRouter.post('/sendmail', userValidator_1.userValidationRules.sendMail, validationMiddleware_1.handleValidationErrors, controller.sendMail.bind(controller));
userRouter.post('/resendmail/:emailId', userValidator_1.userValidationRules.resendMail, validationMiddleware_1.handleValidationErrors, controller.resendMail.bind(controller));
userRouter.post('/verifyotp', userValidator_1.userValidationRules.verifyOTP, validationMiddleware_1.handleValidationErrors, controller.verifyOTP.bind(controller));
userRouter.get('/searchuser/:query', userValidator_1.userValidationRules.searchUser, validationMiddleware_1.handleValidationErrors, controller.searchUser.bind(controller));
userRouter.get('/getsearchuser/:userId', userValidator_1.userValidationRules.getSearchUser, validationMiddleware_1.handleValidationErrors, controller.getSearchUser.bind(controller));
userRouter.post('/updatelocation', userValidator_1.userValidationRules.updateLocation, validationMiddleware_1.handleValidationErrors, controller.onUpdatelocation.bind(controller));
userRouter.get('/getlocations', controller.onGetLocations.bind(controller));
userRouter.get('/getsuggestions', controller.onGetSuggestions.bind(controller));
exports.default = userRouter;
