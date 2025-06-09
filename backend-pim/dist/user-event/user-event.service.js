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
exports.UserEventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserEventService = class UserEventService {
    constructor(userEventModel) {
        this.userEventModel = userEventModel;
    }
    async createUserEvents(userId, events) {
        try {
            const createdUserEvents = events.map(event => ({
                userId: userId,
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
                location: event.location,
                description: event.description,
            }));
            return await this.userEventModel.insertMany(createdUserEvents);
        }
        catch (error) {
            console.error('Error inserting user events:', error);
            throw new Error('Failed to insert user events');
        }
    }
    async getUserEvents(userId) {
        try {
            return await this.userEventModel.find({ userId }).exec();
        }
        catch (error) {
            console.error('Error fetching user events:', error);
            throw new Error('Failed to fetch user events');
        }
    }
    async deleteUserEventsByUser(userId) {
        console.log(`Deleting UserEvents for userId: ${userId}`);
        await this.userEventModel.deleteMany({ userId });
        console.log(`✅ UserEvents for userId ${userId} deleted successfully`);
    }
};
exports.UserEventService = UserEventService;
exports.UserEventService = UserEventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('UserEvent')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserEventService);
//# sourceMappingURL=user-event.service.js.map