import { ConversationService } from './conversation.service';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    createGroup(data: {
        participants: string[];
        title: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createConversation(userId: string, otherUserId: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserConversationsname(userId: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserConversations(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/conversation.entity").Conversation> & import("./entities/conversation.entity").Conversation & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
