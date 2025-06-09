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
exports.CarnetController = void 0;
const common_1 = require("@nestjs/common");
const carnet_service_1 = require("./carnet.service");
let CarnetController = class CarnetController {
    constructor(carnetService) {
        this.carnetService = carnetService;
    }
    createCarnet(data) {
        return this.carnetService.createCarnet(data);
    }
    async getUserCarnet(userId) {
        const carnet = await this.carnetService.getCarnetByUserId(userId);
        if (!carnet)
            return {};
        return carnet;
    }
    async createCarnetForUser(userId, title) {
        console.log(`User ${userId} is trying to create a carnet with title: ${title}`);
        return this.carnetService.createCarnetForUser(userId, title);
    }
    async addPlaceToUserCarnet(userId, placeData) {
        return this.carnetService.addPlaceToUserCarnet(userId, placeData);
    }
    async addPlace(carnetId, placeData) {
        console.log(`Adding place to carnet ${carnetId}`, placeData);
        return this.carnetService.addPlace(carnetId, placeData);
    }
    getAllCarnets() {
        return this.carnetService.getAllCarnets();
    }
    getCarnetById(id) {
        return this.carnetService.getCarnetById(id);
    }
    async updateCarnet(carnetId, updateData) {
        return this.carnetService.updateCarnet(carnetId, updateData);
    }
    async deleteCarnet(carnetId, userId) {
        if (!userId) {
            throw new common_1.NotFoundException('User ID is required');
        }
        await this.carnetService.deleteCarnet(carnetId, userId);
        return { message: 'Carnet supprimé avec succès' };
    }
    unlockCarnet(userId, carnetId) {
        return this.carnetService.unlockCarnet(userId, carnetId);
    }
    async unlockPlace(userId, placeId) {
        return this.carnetService.unlockPlace(userId, placeId);
    }
    async getAllCarnetsExceptUser(userId) {
        return this.carnetService.getAllCarnetsExceptUser(userId);
    }
    async getOwnerByPlace(placeId) {
        return this.carnetService.getOwnerByPlace(placeId);
    }
    async getAllPlaces() {
        return this.carnetService.getAllPlaces();
    }
    async getPlaceById(placeId) {
        return this.carnetService.getPlaceById(placeId);
    }
    async updatePlace(carnetId, placeId, updateData) {
        return this.carnetService.updatePlace(carnetId, placeId, updateData);
    }
    async findCarnetIdByPlaceId(placeId) {
        const carnetId = await this.carnetService.findCarnetIdByPlaceId(placeId);
        if (!carnetId) {
            throw new common_1.NotFoundException('Carnet not found for the given place');
        }
        return carnetId;
    }
    async deletePlace(carnetId, placeId) {
        return this.carnetService.deletePlace(carnetId, placeId);
    }
    async getPlacesByCategory(category) {
        return this.carnetService.getPlacesByCategory(category);
    }
    async getPlacesByCategories(categories) {
        return this.carnetService.getPlacesByCategories(categories);
    }
    async getTotalRating(userId) {
        const rating = await this.carnetService.getTotalRatingForTraveler(userId);
        return { averageRating: rating };
    }
};
exports.CarnetController = CarnetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarnetController.prototype, "createCarnet", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getUserCarnet", null);
__decorate([
    (0, common_1.Post)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "createCarnetForUser", null);
__decorate([
    (0, common_1.Post)('user/:userId/place'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "addPlaceToUserCarnet", null);
__decorate([
    (0, common_1.Post)(':carnetId/places'),
    __param(0, (0, common_1.Param)('carnetId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "addPlace", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarnetController.prototype, "getAllCarnets", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarnetController.prototype, "getCarnetById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "updateCarnet", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "deleteCarnet", null);
__decorate([
    (0, common_1.Put)('user/:userId/unlock/:carnetId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('carnetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CarnetController.prototype, "unlockCarnet", null);
__decorate([
    (0, common_1.Put)(':userId/unlock/:placeId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "unlockPlace", null);
__decorate([
    (0, common_1.Get)('exclude/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getAllCarnetsExceptUser", null);
__decorate([
    (0, common_1.Get)('place/:placeId/owner'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getOwnerByPlace", null);
__decorate([
    (0, common_1.Get)('places'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getAllPlaces", null);
__decorate([
    (0, common_1.Get)('place/:placeId'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getPlaceById", null);
__decorate([
    (0, common_1.Put)(':id/places/:placeId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('placeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "updatePlace", null);
__decorate([
    (0, common_1.Get)('place/:placeId/carnetid'),
    __param(0, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "findCarnetIdByPlaceId", null);
__decorate([
    (0, common_1.Delete)(':carnetId/places/:placeId'),
    __param(0, (0, common_1.Param)('carnetId')),
    __param(1, (0, common_1.Param)('placeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "deletePlace", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getPlacesByCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)('categories')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getPlacesByCategories", null);
__decorate([
    (0, common_1.Get)('total-rating/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarnetController.prototype, "getTotalRating", null);
exports.CarnetController = CarnetController = __decorate([
    (0, common_1.Controller)('carnets'),
    __metadata("design:paramtypes", [carnet_service_1.CarnetService])
], CarnetController);
//# sourceMappingURL=carnet.controller.js.map