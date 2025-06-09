import { Document } from 'mongoose';
export declare class Chat {
    message: string;
    senderId: string;
    recipientId: string;
    timestamp: Date;
}
export type ChatDocument = Chat & Document;
export declare const ChatSchema: import("mongoose").Schema<Chat, import("mongoose").Model<Chat, any, any, any, Document<unknown, any, Chat> & Chat & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Chat, Document<unknown, {}, import("mongoose").FlatRecord<Chat>> & import("mongoose").FlatRecord<Chat> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
