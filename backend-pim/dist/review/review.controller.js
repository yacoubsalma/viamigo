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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async addReview(placeId, reviewData) {
        return this.reviewService.addReview(placeId, reviewData.userId, reviewData.rating, reviewData.comment);
    }
    async getReviews(placeId) {
        return this.reviewService.getReviews(placeId);
    }
    async getAverageRating(placeId) {
        return this.reviewService.getAverageRating(placeId);
    }
    async getGlobalAverageRating(carnetId) {
        return this.reviewService.getGlobalAverageRating(carnetId);
    }
    async updateReview(placeId, userId, rating, comment) {
        return this.reviewService.editReview(placeId, userId, rating, comment);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)(':placeId/average-rating'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getAverageRating", null);
__decorate([
    (0, common_1.Get)('/carnet/:carnetId/global-average-rating'),
    __param(0, (0, common_1.Param)('carnetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getGlobalAverageRating", null);
__decorate([
    (0, common_1.Put)(':placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('rating')),
    __param(3, (0, common_1.Body)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "updateReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map