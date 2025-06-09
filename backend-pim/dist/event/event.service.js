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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const event_entity_1 = require("./entities/event.entity");
const user_entity_1 = require("../users/entities/user.entity");
const conversation_service_1 = require("../conversation/conversation.service");
const socket_gateway_1 = require("../notification/socket.gateway");
const notification_entity_1 = require("../notification/entities/notification.entity");
const users_service_1 = require("../users/users.service");
const preference_entity_1 = require("../preferences/entities/preference.entity");
const free_times_service_1 = require("../free-times/free-times.service");
let EventService = class EventService {
    constructor(eventModel, userModel, usersService, conversationService, socketGateway, freeTimeService, preferenceModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
        this.usersService = usersService;
        this.conversationService = conversationService;
        this.socketGateway = socketGateway;
        this.freeTimeService = freeTimeService;
        this.preferenceModel = preferenceModel;
    }
    async createEvent(creatorId, title, description, startDate, endDate, location, joinPrice = 5, type, imagePath) {
        const creatorObjectId = mongoose_3.Types.ObjectId.createFromHexString(creatorId);
        const conversation = await this.conversationService.createConversationGroup({
            participants: creatorId,
            title: title,
        });
        const event = new this.eventModel({
            creatorId: creatorObjectId,
            title,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            location,
            participants: [creatorObjectId],
            joinPrice,
            conversationId: conversation._id,
            type,
            imagePath,
        });
        const savedEvent = await event.save();
        const user = await this.userModel.findById(creatorObjectId);
        if (user) {
            user.coins = (user.coins || 0) + 5;
            await user.save();
        }
        else {
            throw new Error('Creator not found');
        }
        this.socketGateway.sendNotification({
            senderId: creatorId,
            recipientId: creatorId,
            type: notification_entity_1.NotificationType.NEW_Event,
            content: `Great! Your event "${title}" has been created!`,
            data: { eventId: savedEvent._id.toString() },
        });
        const allUsersExceptCreator = await this.usersService.findAllExceptCreator(creatorId);
        for (const user of allUsersExceptCreator) {
            this.socketGateway.sendNotification({
                senderId: creatorId,
                recipientId: user._id.toString(),
                type: notification_entity_1.NotificationType.NEW_EVENT_All,
                content: `Don't miss it! The new event "${title}" is here!`,
                data: { eventId: savedEvent._id.toString() },
            });
        }
        return savedEvent;
    }
    async findEventsBetween(start, end) {
        return this.eventModel.find({
            startDate: { $gte: start },
            endDate: { $lte: end }
        }).exec();
    }
    async findOne(id) {
        const events = await this.eventModel.findById(id)
            .populate({
            path: 'participants',
            model: 'User',
            select: '_id name'
        })
            .exec();
        return events;
    }
    async isUserJoined(eventId, userId) {
        const event = await this.eventModel.findById(eventId);
        if (!event)
            throw new Error('Event not found');
        const userObjectId = new mongoose_3.Types.ObjectId(userId);
        return event.participants.includes(userObjectId);
    }
    async findAll(userId) {
        return await this.eventModel
            .find({
            $or: [
                { creatorId: mongoose_3.Types.ObjectId.createFromHexString(userId) },
                { participants: mongoose_3.Types.ObjectId.createFromHexString(userId) },
            ],
        })
            .populate('participants', 'name')
            .exec();
    }
    async findAllEvents() {
        const events = await this.eventModel
            .find()
            .populate({
            path: 'participants',
            model: 'User',
            select: '_id name'
        });
        const result = events.map(event => ({
            ...event.toObject(),
            participantNames: event.participants.map((p) => p.name),
        }));
        return result;
    }
    async joinEvent(eventId, userId) {
        const eventObjectId = mongoose_3.Types.ObjectId.createFromHexString(eventId);
        const userObjectId = mongoose_3.Types.ObjectId.createFromHexString(userId);
        const event = await this.eventModel.findById(eventObjectId);
        if (!event)
            throw new Error('Event not found');
        if (!event.participants.includes(userObjectId)) {
            const user = await this.userModel.findById(userObjectId);
            if (!user || user.coins < event.joinPrice) {
                throw new common_1.HttpException('Insufficient coins', common_1.HttpStatus.BAD_REQUEST);
            }
            event.participants.push(userObjectId);
            user.coins -= event.joinPrice;
            await event.save();
            await user.save();
        }
        const conversation = await this.conversationService.findConversationByTitle(event.title);
        if (conversation) {
            await this.conversationService.addUserToConversation(conversation._id.toString(), userId);
        }
        else {
            console.log(`❌ Conversation not found for event: ${event.title}`);
        }
        return event;
    }
    async getEventsByUser(userId) {
        return this.eventModel.find({ creatorId: new mongoose_3.Types.ObjectId(userId) }).exec();
    }
    async updateEvent(eventId, updateData) {
        const eventObjectId = mongoose_3.Types.ObjectId.createFromHexString(eventId);
        const event = await this.eventModel.findById(eventObjectId);
        if (!event)
            throw new Error('Event not found');
        if (updateData.title)
            event.title = updateData.title;
        if (updateData.description)
            event.description = updateData.description;
        if (updateData.startDate)
            event.startDate = new Date(updateData.startDate);
        if (updateData.endDate)
            event.endDate = new Date(updateData.endDate);
        if (updateData.location)
            event.location = updateData.location;
        if (updateData.joinPrice !== undefined)
            event.joinPrice = updateData.joinPrice;
        await event.save();
        return event;
    }
    async deleteEvent(eventId) {
        const eventObjectId = mongoose_3.Types.ObjectId.createFromHexString(eventId);
        const event = await this.eventModel.findById(eventObjectId);
        if (!event)
            throw new Error('Event not found');
        for (let userId of event.participants) {
            const user = await this.userModel.findById(userId);
            if (user) {
                user.coins += event.joinPrice;
                await user.save();
            }
        }
        await this.eventModel.findByIdAndDelete(eventObjectId);
        return { message: 'Event deleted successfully' };
    }
    async findSpecificEvents(userId) {
        console.log("Searching for preferences with userId:", userId);
        const userPreferences = await this.preferenceModel.findOne({ user: userId });
        console.log("Fetched user preferences:", userPreferences);
        if (!userPreferences) {
            throw new Error('User preferences not found');
        }
        const preferredEventTypes = userPreferences.eventPreferences || [];
        if (preferredEventTypes.length === 0) {
            return [];
        }
        const event = await this.eventModel
            .find({ type: { $in: preferredEventTypes } })
            .populate({
            path: 'participants',
            model: 'User',
            select: '_id name'
        }).exec();
        const result = event.map(event => ({
            ...event.toObject(),
            participantNames: event.participants.map((p) => p.name),
        }));
        return result;
    }
    async findEventsDuringUserFreeTime(userId) {
        const freeTimes = await this.freeTimeService.getFreeTimeByUser(userId);
        if (!freeTimes || freeTimes.length === 0)
            return [];
        const orConditions = freeTimes.map(({ start, end }) => ({
            $or: [
                { startDate: { $gte: new Date(start) } },
                { endDate: { $lte: new Date(end) } },
            ]
        }));
        return this.eventModel.find({ $or: orConditions }).exec();
    }
    async findNonConflictingEvents(userId) {
        const userEvents = await this.eventModel.find({
            $or: [{ creatorId: userId }, { participants: userId }],
        });
        console.log(`📌 Events for user ${userId}:`, userEvents);
        const conflictingEventIds = userEvents.map(event => event._id);
        const nonConflictingEvents = await this.eventModel.find({
            $or: [
                { _id: { $nin: conflictingEventIds } },
                { participants: userId },
                { startDate: { $gte: new Date() } },
                { endDate: { $gte: new Date() } },
            ],
        });
        console.log(`✅ Non-conflicting events found:`, nonConflictingEvents);
        return nonConflictingEvents;
    }
    async deleteEventsByUser(userId) {
        const events = await this.eventModel.find({ creatorId: userId });
        for (const event of events) {
            for (const participantId of event.participants) {
                const user = await this.userModel.findById(participantId);
                if (user) {
                    user.coins += event.joinPrice;
                    await user.save();
                }
            }
            await this.eventModel.findByIdAndDelete(event._id);
        }
    }
    async getEventsCreatedByUser(userId) {
        return this.eventModel.find({ creatorId: new mongoose_3.Types.ObjectId(userId) }).exec();
    }
    async leaveEvent(eventId, userId) {
        const eventObjectId = mongoose_3.Types.ObjectId.createFromHexString(eventId);
        const userObjectId = mongoose_3.Types.ObjectId.createFromHexString(userId);
        const event = await this.eventModel.findById(eventObjectId);
        if (!event)
            throw new Error('Event not found');
        const index = event.participants.findIndex(p => p.equals(userObjectId));
        if (index === -1) {
            throw new common_1.HttpException('User is not a participant of this event', common_1.HttpStatus.BAD_REQUEST);
        }
        event.participants.splice(index, 1);
        await event.save();
        const conversation = await this.conversationService.findConversationByTitle(event.title);
        if (conversation) {
            await this.conversationService.removeUserFromConversation(conversation._id.toString(), userId);
        }
        return { message: 'Successfully left the event' };
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_entity_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(6, (0, mongoose_1.InjectModel)(preference_entity_1.Preference.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService,
        conversation_service_1.ConversationService,
        socket_gateway_1.NotificationGateway,
        free_times_service_1.FreeTimeService,
        mongoose_2.Model])
], EventService);
//# sourceMappingURL=event.service.js.map