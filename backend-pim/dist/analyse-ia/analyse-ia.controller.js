"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyseIaController = void 0;
const common_1 = require("@nestjs/common");
const analyse_ia_service_1 = require("./analyse-ia.service");
let AnalyseIaController = class AnalyseIaController {
    constructor(analyseService) {
        this.analyseService = analyseService;
    }
    async log(body) {
        await this.analyseService.logActivity(body.userId, body.type, body.value);
        return { success: true };
    }
    async runAnalysis(userId) {
        const prefs = await this.analyseService.analyseUser(userId);
        return { success: true, preferences: prefs };
    }
};
exports.AnalyseIaController = AnalyseIaController;
__decorate([
    (0, common_1.Post)('log'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalyseIaController.prototype, "log", null);
__decorate([
    (0, common_1.Get)('run/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyseIaController.prototype, "runAnalysis", null);
exports.AnalyseIaController = AnalyseIaController = __decorate([
    (0, common_1.Controller)('analyse'),
    __metadata("design:paramtypes", [analyse_ia_service_1.AnalyseIaService])
], AnalyseIaController);
//# sourceMappingURL=analyse-ia.controller.js.map