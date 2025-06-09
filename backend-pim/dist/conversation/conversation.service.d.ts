import mongoose, { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationGateway } from 'src/notification/socket.gateway';
import { User } from 'src/users/entities/user.entity';
export declare class ConversationService {
    private conversationModel;
    private userModel;
    private readonly notificationService;
    private readonly socketGateway;
    constructor(conversationModel: Model<Conversation>, userModel: Model<User>, notificationService: NotificationService, socketGateway: NotificationGateway);
    getUserConversationsname(userId: string): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserConversations(userId: string): Promise<(mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createConversation(participants: string[]): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createConversationGroup(data: {
        participants: String;
        title: string;
    }): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addUserToConversation(conversationId: string, userId: string): Promise<void>;
    findConversationByTitle(title: string): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createConversationavecnot(userId: string, otherUserId: string): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createConversation2(userId: string, otherUserId: string): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createConversationGroupnotevent(data: {
        participants: string[];
        title: string;
    }): Promise<mongoose.Document<unknown, {}, Conversation> & Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteConversationsByUser(userId: string): Promise<void>;
    removeUserFromConversation(conversationId: string, userId: string): Promise<{
        message: string;
    }>;
}
