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
exports.AIController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
let AIController = class AIController {
    constructor(aiService) {
        this.aiService = aiService;
    }
    async getPersonalizedByBehavior(userId) {
        console.log("🎯 Requête IA reçue pour userId:", userId);
        const recommendations = await this.aiService.getBehaviorBasedRecommendationsv3(userId);
        return {
            success: true,
            recommendations
        };
    }
    async getPersonalizedByBehaviorv2(userId) {
        const { recommendations, lockedPlaces } = await this.aiService.getBehaviorBasedRecommendationsv3(userId);
        return {
            success: true,
            recommendations,
            lockedPlaces
        };
    }
    async getPlacesBySearch(userId) {
        const result = await this.aiService.getFilteredPlacesByUserSearchv2(userId);
        return {
            success: true,
            ...result
        };
    }
    async generatePoster(description) {
        const prompt = `Créer une affiche artistique et colorée pour cet événement : ${description}. Affiche verticale, ambiance festive, style graphique moderne.`;
        const imageBase64 = await this.aiService.generateImage(prompt);
        return { image: `data:image/png;base64,${imageBase64}` };
    }
    async generatePosterWithFlux(body) {
        const { description, title, startDate, endDate, location } = body;
        const imageBase64 = await this.aiService.generateImageWithFlux(title, startDate, endDate, location, description);
        return { image: `data:image/png;base64,${imageBase64}` };
    }
};
exports.AIController = AIController;
__decorate([
    (0, common_1.Get)('personalization/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "getPersonalizedByBehavior", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "getPersonalizedByBehaviorv2", null);
__decorate([
    (0, common_1.Get)('/filtered-places/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "getPlacesBySearch", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "generatePoster", null);
__decorate([
    (0, common_1.Post)('generate-poster-flux'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "generatePosterWithFlux", null);
exports.AIController = AIController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], AIController);
//# sourceMappingURL=ai.controller.js.map