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
exports.TripController = void 0;
const common_1 = require("@nestjs/common");
const trip_service_1 = require("./trip.service");
const common_2 = require("@nestjs/common");
let TripController = class TripController {
    constructor(tripService) {
        this.tripService = tripService;
    }
    async generateItinerary(destination, startDate, endDate, userId) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const result = await this.tripService.generateItinerary(destination, days, userId, start);
        return {
            itinerary: result.itinerary,
            coinsRemaining: result.coinsRemaining,
            message: 'Trip generated successfully',
        };
    }
    async updateTripDay(userId, dayIndex, newActivities) {
        const result = await this.tripService.updateTripDay(userId, dayIndex, newActivities);
        return {
            message: 'Day updated successfully',
            updatedItinerary: result.itinerary,
        };
    }
    async acceptTrip(userId, destination, startDate, endDate, itinerary) {
        const trip = await this.tripService.acceptTrip(userId, destination, new Date(startDate), new Date(endDate), itinerary);
        return {
            tripId: trip._id,
            message: 'Trip accepted and saved successfully',
        };
    }
    async getAcceptedTrips(userId) {
        return this.tripService.getAcceptedTrips(userId);
    }
};
exports.TripController = TripController;
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)('destination')),
    __param(1, (0, common_1.Body)('startDate')),
    __param(2, (0, common_1.Body)('endDate')),
    __param(3, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "generateItinerary", null);
__decorate([
    (0, common_1.Patch)('update-day'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('dayIndex')),
    __param(2, (0, common_1.Body)('newActivities')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Array]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "updateTripDay", null);
__decorate([
    (0, common_1.Post)('accept'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('destination')),
    __param(2, (0, common_1.Body)('startDate')),
    __param(3, (0, common_1.Body)('endDate')),
    __param(4, (0, common_1.Body)('itinerary')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Array]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "acceptTrip", null);
__decorate([
    (0, common_2.Get)('accepted/:userId'),
    __param(0, (0, common_2.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TripController.prototype, "getAcceptedTrips", null);
exports.TripController = TripController = __decorate([
    (0, common_1.Controller)('trip'),
    __metadata("design:paramtypes", [trip_service_1.TripService])
], TripController);
//# sourceMappingURL=trip.controller.js.map