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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_entity_1 = require("./entities/notification.entity");
const socket_gateway_1 = require("./socket.gateway");
let NotificationService = class NotificationService {
    constructor(notificationModel, gateway) {
        this.notificationModel = notificationModel;
        this.gateway = gateway;
    }
    async sendSimple(userId, message) {
        console.log(`🔔 Notification pour ${userId} : ${message}`);
        await this.createNotification({
            sender: null,
            recipient: userId,
            type: notification_entity_1.NotificationType.INFO,
            message,
            data: {},
        });
        this.gateway?.server.to(userId).emit('newNotification', {
            recipient: userId,
            message,
            type: 'info',
        });
    }
    async createNotification(createNotificationDto) {
        const notification = new this.notificationModel(createNotificationDto);
        return notification.save();
    }
    async getUserNotifications(userId) {
        return await this.notificationModel.find({ recipient: userId })
            .populate({
            path: 'sender',
            select: 'name',
        })
            .sort({ createdAt: -1 });
    }
    async markAsRead(notificationId) {
        return await this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true });
    }
    async deleteNotification(notificationId) {
        return await this.notificationModel.findByIdAndDelete(notificationId);
    }
    async countUnreadNotifications(userId) {
        return this.notificationModel.countDocuments({
            recipient: userId,
            isRead: false,
        });
    }
    async deleteNotificationsByUser(userId) {
        await this.notificationModel.deleteMany({ sender: userId }).exec();
        await this.notificationModel.deleteMany({ recipient: userId }).exec();
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notification_entity_1.Notification.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => socket_gateway_1.NotificationGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        socket_gateway_1.NotificationGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map