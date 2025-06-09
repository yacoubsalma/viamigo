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
exports.UserEventController = void 0;
const common_1 = require("@nestjs/common");
const user_event_service_1 = require("./user-event.service");
let UserEventController = class UserEventController {
    constructor(userEventService) {
        this.userEventService = userEventService;
    }
    async create(userId, events) {
        try {
            const createdEvents = await this.userEventService.createUserEvents(userId, events);
            return { message: 'Events created successfully', data: createdEvents };
        }
        catch (error) {
            console.error('Error creating user events:', error);
            throw new common_1.HttpException('Failed to create events', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findByUser(userId) {
        try {
            const events = await this.userEventService.getUserEvents(userId);
            return { message: 'User events fetched successfully', data: events };
        }
        catch (error) {
            console.error('Error fetching user events:', error);
            throw new common_1.HttpException('Failed to fetch user events', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UserEventController = UserEventController;
__decorate([
    (0, common_1.Post)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UserEventController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserEventController.prototype, "findByUser", null);
exports.UserEventController = UserEventController = __decorate([
    (0, common_1.Controller)('user-events'),
    __metadata("design:paramtypes", [user_event_service_1.UserEventService])
], UserEventController);
//# sourceMappingURL=user-event.controller.js.map