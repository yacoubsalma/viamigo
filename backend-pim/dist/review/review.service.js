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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_entity_1 = require("./entities/review.entity");
const carnet_entity_1 = require("../carnet/entities/carnet.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ReviewService = class ReviewService {
    constructor(reviewModel, carnetModel, userModel) {
        this.reviewModel = reviewModel;
        this.carnetModel = carnetModel;
        this.userModel = userModel;
    }
    async addReview(placeId, userId, rating, comment) {
        console.log(`Adding review for placeId: ${placeId} by userId: ${userId}`);
        const existingReview = await this.reviewModel.findOne({ placeId, userId });
        if (existingReview) {
            throw new common_1.BadRequestException('User has already reviewed this place');
        }
        const review = new this.reviewModel({ placeId, userId, rating, comment });
        await review.save();
        console.log('Review added:', review);
        await this.updatePlaceRating(placeId);
        try {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.coins += 2;
            await user.save();
            console.log(`User ${userId} rewarded with 2 coins. New balance: ${user.coins}`);
        }
        catch (error) {
            console.error('Error updating coins:', error);
        }
        return review;
    }
    async calculateAverageRating(placeId) {
        console.log(`Calculating average rating for placeId: ${placeId}`);
        const reviews = await this.reviewModel.find({ placeId });
        console.log(`Fetched ${reviews.length} reviews for placeId: ${placeId}`);
        if (reviews.length === 0)
            return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        console.log(`New calculated average rating for placeId ${placeId}: ${averageRating}`);
        return averageRating;
    }
    async updatePlaceRating(placeId) {
        console.log(`Updating average rating for placeId: ${placeId}`);
        const carnet = await this.carnetModel.findOne({ "places._id": new mongoose_2.Types.ObjectId(placeId) }).exec();
        if (!carnet) {
            console.error(`Carnet with placeId ${placeId} not found`);
            return;
        }
        const placeIndex = carnet.places.findIndex(place => place._id.toString() === placeId);
        if (placeIndex === -1) {
            console.error(`Place ${placeId} not found in carnet`);
            return;
        }
        const averageRating = await this.calculateAverageRating(placeId);
        carnet.places[placeIndex].averageRating = averageRating;
        carnet.globalAverageRating = this.calculateGlobalAverageRating(carnet);
        await carnet.save();
        console.log(`✅ Place ${placeId} updated with new average rating: ${averageRating}`);
        console.log(`✅ Carnet ${carnet._id} updated with new global average rating: ${carnet.globalAverageRating}`);
    }
    calculateGlobalAverageRating(carnet) {
        if (!carnet.places || carnet.places.length === 0)
            return 0;
        const totalRating = carnet.places.reduce((sum, place) => sum + place.averageRating, 0);
        const globalAverage = totalRating / carnet.places.length;
        console.log(`Calculated global average rating for carnet ${carnet._id}: ${globalAverage}`);
        return globalAverage;
    }
    async getReviews(placeId) {
        console.log(`Fetching reviews for placeId: ${placeId}`);
        const reviews = await this.reviewModel.find({ placeId }).populate('userId', 'username');
        console.log(`Reviews found: ${reviews.length}`, reviews);
        return reviews;
    }
    async getAverageRating(placeId) {
        return this.calculateAverageRating(placeId);
    }
    async getGlobalAverageRating(carnetId) {
        const carnet = await this.carnetModel.findById(carnetId);
        if (!carnet) {
            throw new common_1.NotFoundException('Carnet not found');
        }
        return this.calculateGlobalAverageRating(carnet);
    }
    async editReview(placeId, userId, rating, comment) {
        console.log(`Editing review for placeId: ${placeId} by userId: ${userId}`);
        const review = await this.reviewModel.findOne({ placeId, userId });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        review.rating = rating;
        review.comment = comment ?? review.comment;
        await review.save();
        console.log('Review updated:', review);
        await this.updatePlaceRating(placeId);
        return review;
    }
    async deleteReviewsByUser(userId) {
        console.log(`Deleting reviews for userId: ${userId}`);
        await this.reviewModel.deleteMany({ userId });
        console.log(`✅ Reviews for userId ${userId} deleted successfully`);
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_entity_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(carnet_entity_1.Carnet.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=review.service.js.map