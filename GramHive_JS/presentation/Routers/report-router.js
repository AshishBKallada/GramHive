"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const report_repository_1 = require("../../domain/repositories/report-repository");
const reportInteractor_1 = require("../../domain/usecases/reportInteractor");
const report_controller_1 = require("../Controllers/report-controller");
const reportValidator_1 = require("../../validators/reportValidator");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const repository = new report_repository_1.ReportReporsitoryImpl();
const interactor = new reportInteractor_1.ReportInteractorImpl(repository);
const controller = new report_controller_1.ReportController(interactor);
const reportRouter = (0, express_1.Router)();
reportRouter.post('/content', authMiddleware_1.default, reportValidator_1.reportValidationRules.reportContent, validationMiddleware_1.handleValidationErrors, controller.onReportContent.bind(controller));
reportRouter.post('/user/:Id', authMiddleware_1.default, reportValidator_1.reportValidationRules.reportUser, validationMiddleware_1.handleValidationErrors, controller.onReportUser.bind(controller));
reportRouter.post('/post/:Id', authMiddleware_1.default, reportValidator_1.reportValidationRules.reportPost, validationMiddleware_1.handleValidationErrors, controller.onReportPost.bind(controller));
reportRouter.post('/addfeedback', authMiddleware_1.default, reportValidator_1.reportValidationRules.reportFeedback, validationMiddleware_1.handleValidationErrors, controller.onReportFeedback.bind(controller));
exports.default = reportRouter;
