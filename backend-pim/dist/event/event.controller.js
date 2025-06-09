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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const mongoose_1 = require("mongoose");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async isUserJoined(eventId, userId) {
        const isJoined = await this.eventService.isUserJoined(eventId, userId);
        return { joined: isJoined };
    }
    async create(body) {
        const event = await this.eventService.createEvent(body.creatorId, body.title, body.description, new Date(body.startDate).toISOString(), new Date(body.endDate).toISOString(), body.location, body.joinPrice, body.type, body.imagePath);
        return event;
    }
    async findOne(id) {
        if (id === 'all') {
            return await this.eventService.findAllEvents();
        }
        else {
            return await this.eventService.findOne(id);
        }
    }
    async findAlluser(userId) {
        return await this.eventService.findAll(userId);
    }
    async getAllEvents() {
        const events = await this.eventService.findAllEvents();
        console.log("📢 Events fetched from API:", events);
        return events;
    }
    async join(id, body) {
        return await this.eventService.joinEvent(id, body.userId);
    }
    async getByUser(userId) {
        return this.eventService.getEventsByUser(userId);
    }
    async update(id, body) {
        return await this.eventService.updateEvent(id, body);
    }
    async delete(id) {
        return await this.eventService.deleteEvent(id);
    }
    async findSpecificEvents(userId) {
        return await this.eventService.findSpecificEvents(userId);
    }
    async suggestForUser(userId) {
        return this.eventService.findEventsDuringUserFreeTime(userId);
    }
    async getEventsDuringUserFreeTime(userId) {
        return this.eventService.findEventsDuringUserFreeTime(userId);
    }
    async getNonConflictingEvents(userId) {
        return this.eventService.findNonConflictingEvents(new mongoose_1.Types.ObjectId(userId));
    }
    async getCreatedByUser(userId) {
        return await this.eventService.getEventsCreatedByUser(userId);
    }
    async leaveEvent(eventId, userId) {
        return this.eventService.leaveEvent(eventId, userId);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(':eventId/joined/:userId'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "isUserJoined", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(""),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findAlluser", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "join", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('specific/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "findSpecificEvents", null);
__decorate([
    (0, common_1.Get)('suggest/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "suggestForUser", null);
__decorate([
    (0, common_1.Get)('during-free-time/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventsDuringUserFreeTime", null);
__decorate([
    (0, common_1.Get)('non-conflicting/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getNonConflictingEvents", null);
__decorate([
    (0, common_1.Get)('created-by/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getCreatedByUser", null);
__decorate([
    (0, common_1.Patch)(':eventId/leave'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "leaveEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map