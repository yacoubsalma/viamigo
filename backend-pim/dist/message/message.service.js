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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_entity_1 = require("./entities/message.entity");
const mongoose_2 = require("mongoose");
const chat_gateway_1 = require("../chat/chat.gateway");
const conversation_entity_1 = require("../conversation/entities/conversation.entity");
let MessageService = class MessageService {
    constructor(messageModel, conversationModel, notificationGateway) {
        this.messageModel = messageModel;
        this.conversationModel = conversationModel;
        this.notificationGateway = notificationGateway;
    }
    async createMessage(conversationId, senderId, content, eventId, type) {
        const message = new this.messageModel({
            conversation: conversationId,
            sender: senderId,
            content: content || '',
            event: eventId ?? null,
            type: type ?? null,
        });
        const masage = await message.save();
        this.notificationGateway.server.to(conversationId).emit('newMessage', masage);
        await this.conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: masage._id,
            updatedAt: new Date(),
        });
        return masage;
    }
    async getMessages(conversationId) {
        return await this.messageModel
            .find({ conversation: conversationId })
            .populate({
            path: 'sender',
            model: 'User',
            select: 'name profileImage'
        })
            .exec();
    }
    async getMessagesByConversation(conversationId) {
        return this.messageModel
            .find({ conversation: conversationId })
            .sort({ createdAt: 1 })
            .populate('sender', 'name profileImage')
            .exec();
    }
    async getMessagesForUser(userId) {
        return this.messageModel.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
    }
    async createaudioMessage(conversationId, senderId, content, eventId, type) {
        const message = new this.messageModel({
            conversation: conversationId,
            sender: senderId,
            content: content || '',
            event: eventId ?? null,
            type: type ?? 'text',
        });
        return await message.save();
    }
    async deleteMessagesByUser(userId) {
        await this.messageModel.deleteMany({ sender: userId }).exec();
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_entity_1.Message.name)),
    __param(1, (0, mongoose_1.InjectModel)(conversation_entity_1.Conversation.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        chat_gateway_1.ChatGateway])
], MessageService);
//# sourceMappingURL=message.service.js.map