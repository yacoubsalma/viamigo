import { MessageService } from './message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getMessages(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getConversationMessages(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getConversationMessages2(conversationId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getMessages2(conversationId: string): Promise<import("./entities/message.entity").Message[]>;
    sendMessage(body: {
        conversationId: string;
        senderId: string;
        content: string;
        eventId: string;
        type: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    sendAudioMessage(file: Express.Multer.File, conversationId: string, senderId: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/message.entity").Message> & import("./entities/message.entity").Message & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
