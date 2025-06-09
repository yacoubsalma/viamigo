import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { ChatGateway } from 'src/chat/chat.gateway';
import { Conversation } from 'src/conversation/entities/conversation.entity';
export declare class MessageService {
    private messageModel;
    private conversationModel;
    private readonly notificationGateway;
    constructor(messageModel: Model<Message>, conversationModel: Model<Conversation>, notificationGateway: ChatGateway);
    createMessage(conversationId: string, senderId: string, content: string, eventId?: string, type?: string): Promise<import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMessages(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getMessagesByConversation(conversationId: string): Promise<Message[]>;
    getMessagesForUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createaudioMessage(conversationId: string, senderId: string, content: string, eventId?: string, type?: string): Promise<import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteMessagesByUser(userId: string): Promise<void>;
}
