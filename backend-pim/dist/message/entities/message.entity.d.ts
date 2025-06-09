import { Document, Types } from 'mongoose';
export declare class Message extends Document {
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;
    seenBy: Types.ObjectId[];
    event?: Types.ObjectId;
    type?: string;
}
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, Document<unknown, any, Message> & Message & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
