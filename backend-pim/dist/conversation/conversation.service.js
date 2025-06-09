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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const conversation_entity_1 = require("./entities/conversation.entity");
const notification_service_1 = require("../notification/notification.service");
const socket_gateway_1 = require("../notification/socket.gateway");
const notification_entity_1 = require("../notification/entities/notification.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ConversationService = class ConversationService {
    constructor(conversationModel, userModel, notificationService, socketGateway) {
        this.conversationModel = conversationModel;
        this.userModel = userModel;
        this.notificationService = notificationService;
        this.socketGateway = socketGateway;
    }
    async getUserConversationsname(userId) {
        const conversations = await this.conversationModel
            .findById(userId)
            .populate({
            path: 'participants',
            model: 'User',
            select: 'name profileImage'
        })
            .exec();
        console.log("Conversations trouvées:", JSON.stringify(conversations, null, 2));
        return conversations;
    }
    async getUserConversations(userId) {
        const conversations = await this.conversationModel
            .find({ participants: { $in: [userId] } })
            .populate({
            path: 'participants',
            model: 'User',
            select: 'name profileImage'
        })
            .populate({
            path: 'lastMessage',
            select: 'content createdAt',
            options: { sort: { createdAt: -1 } },
        })
            .sort({ 'lastMessage.createdAt': -1 })
            .exec();
        console.log("Conversations trouvées:", JSON.stringify(conversations, null, 2));
        return conversations;
    }
    async createConversation(participants) {
        const conversation = await this.conversationModel.create({ participants });
        return conversation;
    }
    async createConversationGroup(data) {
        const conversation = new this.conversationModel({
            participants: data.participants,
            title: data.title,
        });
        return await conversation.save();
    }
    async addUserToConversation(conversationId, userId) {
        await this.conversationModel.updateOne({ _id: new mongoose_2.Types.ObjectId(conversationId) }, { $addToSet: { participants: userId } });
    }
    async findConversationByTitle(title) {
        return await this.conversationModel.findOne({ title });
    }
    async createConversationavecnot(userId, otherUserId) {
        const existingConversation = await this.conversationModel.findOne({
            participants: { $all: [userId, otherUserId] }
        });
        if (existingConversation) {
            return existingConversation;
        }
        const conversation = await this.conversationModel.create({
            participants: [userId, otherUserId]
        });
        const sender = await this.userModel.findById(userId).select('name');
        const recipient = await this.userModel.findById(otherUserId).select('name');
        if (sender && recipient) {
            this.socketGateway.sendNotification({
                senderId: userId,
                recipientId: otherUserId,
                type: notification_entity_1.NotificationType.MESSAGE,
                content: `Say hi! You have a new conversation with ${sender.name}.`,
                data: { conversationId: conversation._id.toString() }
            });
        }
        return conversation;
    }
    async createConversation2(userId, otherUserId) {
        const existingConversation = await this.conversationModel.findOne({
            participants: { $all: [userId, otherUserId] }
        });
        if (existingConversation) {
            return existingConversation;
        }
        const conversation = await this.conversationModel.create({
            participants: [userId, otherUserId]
        });
        this.socketGateway.sendNotification({
            senderId: userId,
            recipientId: otherUserId,
            type: notification_entity_1.NotificationType.MESSAGE,
            content: `Say hi! You have a new conversation with ${userId}.`,
        });
        return conversation;
    }
    async createConversationGroupnotevent(data) {
        const conversation = new this.conversationModel({
            participants: data.participants,
            title: data.title,
        });
        return await conversation.save();
    }
    async deleteConversationsByUser(userId) {
        await this.conversationModel.deleteMany({ participants: userId }).exec();
    }
    async removeUserFromConversation(conversationId, userId) {
        const conversation = await this.conversationModel.findById(conversationId);
        if (!conversation) {
            throw new common_1.BadRequestException('Conversation not found');
        }
        const isParticipant = conversation.participants.some(participant => participant.toString() === userId);
        if (!isParticipant) {
            throw new common_1.BadRequestException('User is not part of this conversation');
        }
        conversation.participants = conversation.participants.filter(participant => participant.toString() !== userId);
        if (conversation.participants.length === 0) {
            await this.conversationModel.findByIdAndDelete(conversationId);
        }
        else {
            await conversation.save();
        }
        return { message: 'User removed from conversation' };
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_entity_1.Conversation.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService,
        socket_gateway_1.NotificationGateway])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map