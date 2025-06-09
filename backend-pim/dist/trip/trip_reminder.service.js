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
var TripReminderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const trip_entity_1 = require("./entities/trip.entity");
const notification_service_1 = require("../notification/notification.service");
const notification_entity_1 = require("../notification/entities/notification.entity");
let TripReminderService = TripReminderService_1 = class TripReminderService {
    constructor(tripModel, notificationService) {
        this.tripModel = tripModel;
        this.notificationService = notificationService;
        this.logger = new common_1.Logger(TripReminderService_1.name);
    }
    async sendTripReminders() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const dayAfter = new Date(tomorrow);
        dayAfter.setDate(tomorrow.getDate() + 1);
        const trips = await this.tripModel.find({
            startDate: { $gte: tomorrow, $lt: dayAfter },
            status: "accepted",
        });
        for (const trip of trips) {
            await this.notificationService.createNotification({
                type: notification_entity_1.NotificationType.NEW_Event,
                category: notification_entity_1.NotificationCategory.SYSTEM,
                message: `Your trip to ${trip.destination} starts tomorrow! 🎒`,
                sender: trip.userId,
                recipient: trip.userId,
                data: { tripId: trip._id.toString() },
            });
            this.logger.log(`🔔 Reminder sent to user ${trip.userId} for trip to ${trip.destination}`);
        }
    }
};
exports.TripReminderService = TripReminderService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TripReminderService.prototype, "sendTripReminders", null);
exports.TripReminderService = TripReminderService = TripReminderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(trip_entity_1.Trip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], TripReminderService);
//# sourceMappingURL=trip_reminder.service.js.map