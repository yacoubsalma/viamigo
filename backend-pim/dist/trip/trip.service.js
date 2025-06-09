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
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../users/entities/user.entity");
const generative_ai_1 = require("@google/generative-ai");
const trip_entity_1 = require("./entities/trip.entity");
const notification_service_1 = require("../notification/notification.service");
const notification_entity_1 = require("../notification/entities/notification.entity");
let TripService = class TripService {
    constructor(notificationService, userModel, tripModel) {
        this.notificationService = notificationService;
        this.userModel = userModel;
        this.tripModel = tripModel;
        this.TRIP_GENERATION_COST = 20;
        const API_KEY = 'AIzaSyDqaskWKGfwnk6LuNroZHnbOlp1-jV6n2M';
        this.genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-1.5-pro-latest',
            generationConfig: { temperature: 0.9 },
        });
    }
    async acceptTrip(userId, destination, startDate, endDate, itinerary) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const numberOfDays = itinerary.length;
        const totalActivities = itinerary.reduce((sum, day) => sum + (day.activities?.length || 0), 0);
        const trip = await this.tripModel.create({
            userId,
            destination,
            startDate,
            endDate,
            itinerary,
            status: 'accepted',
            numberOfDays,
            totalActivities,
        });
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        if (startDate.toDateString() === tomorrow.toDateString()) {
            await this.notificationService.createNotification({
                type: notification_entity_1.NotificationType.NEW_Event,
                category: notification_entity_1.NotificationCategory.SYSTEM,
                message: `Your trip to ${destination} starts tomorrow! 🎒`,
                sender: userId,
                recipient: userId,
                data: { tripId: trip._id.toString() },
            });
        }
        return trip;
    }
    async generateItinerary(destination, days, userId, startDate, regenerate) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.coins < this.TRIP_GENERATION_COST) {
            throw new common_1.BadRequestException(`Not enough coins.`);
        }
        const prompt = regenerate
            ? `Generate a DIFFERENT ${days}-day itinerary for ${destination}. Make it clearly different from a previous plan, with new activities and new places.`
            : `Generate a detailed ${days}-day itinerary for ${destination}`;
        let itinerary;
        try {
            const result = await this.model.generateContent({
                contents: [{ parts: [{ text: prompt }] }],
            });
            itinerary = result.response.text();
        }
        catch (error) {
            console.error('Error generating content with Gemini:', error);
            if (error.response?.data) {
                console.error('Gemini API Error Response:', error.response.data);
            }
            throw new Error('Failed to generate itinerary');
        }
        const structuredItinerary = this.parseItinerary(itinerary, startDate);
        user.coins -= this.TRIP_GENERATION_COST;
        await user.save();
        await this.tripModel.create({
            userId,
            destination,
            startDate,
            endDate: new Date(startDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000),
            itinerary: structuredItinerary,
        });
        return {
            itinerary: structuredItinerary,
            coinsRemaining: user.coins,
        };
    }
    parseItinerary(itinerary, startDate) {
        const days = itinerary.split('**Day');
        const structuredDays = days.slice(1).map((day, index) => {
            const dayParts = day.split('\n').filter((line) => line.trim().length > 0);
            const date = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000);
            return {
                date: date.toISOString().split('T')[0],
                activities: dayParts,
            };
        });
        return structuredDays;
    }
    async updateTripDay(userId, dayIndex, newActivities) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        let itinerary = user.itinerary || [];
        if (dayIndex < 0 || dayIndex >= itinerary.length) {
            throw new common_1.BadRequestException('Invalid day index');
        }
        if (!itinerary[dayIndex].activities) {
            itinerary[dayIndex].activities = [];
        }
        itinerary[dayIndex].activities = newActivities;
        user.itinerary = itinerary;
        await user.save();
        return { itinerary };
    }
    async deleteTripsByUser(userId) {
        console.log(`Deleting trips for userId: ${userId}`);
        await this.tripModel.deleteMany({ userId });
        console.log(`✅ Trips for userId ${userId} deleted successfully`);
    }
    async getAcceptedTrips(userId) {
        return this.tripModel.find({ userId, status: 'accepted' }).sort({ startDate: 1 }).exec();
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(trip_entity_1.Trip.name)),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        mongoose_2.Model,
        mongoose_2.Model])
], TripService);
//# sourceMappingURL=trip.service.js.map