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
exports.MatchingController = void 0;
const common_1 = require("@nestjs/common");
const matching_service_1 = require("./matching.service");
let MatchingController = class MatchingController {
    constructor(matchingService) {
        this.matchingService = matchingService;
    }
    async matchUser(userId) {
        try {
            const matches = await this.matchingService.matchUserWithDatabase(userId);
            return { success: true, results: matches };
        }
        catch (err) {
            throw new common_1.HttpException({ message: err.message || 'Erreur lors du matching' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async showUserProfile(userId) {
        try {
            return await this.matchingService.matchUser(userId);
        }
        catch (err) {
            throw new common_1.HttpException({ message: err.message || 'Erreur lors de la génération du profil' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MatchingController = MatchingController;
__decorate([
    (0, common_1.Post)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "matchUser", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchingController.prototype, "showUserProfile", null);
exports.MatchingController = MatchingController = __decorate([
    (0, common_1.Controller)('match'),
    __metadata("design:paramtypes", [matching_service_1.MatchingService])
], MatchingController);
//# sourceMappingURL=matching.controller.js.map