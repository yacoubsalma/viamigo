export declare class UserEvent {
}
import { Schema, Document } from 'mongoose';
export interface UserEvent extends Document {
    userId: string;
    title: string;
    start: Date;
    end: Date;
    location: string;
    description: string;
}
export declare const UserEventSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    location: string;
    start: NativeDate;
    end: NativeDate;
    description: string;
    title: string;
    userId: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    location: string;
    start: NativeDate;
    end: NativeDate;
    description: string;
    title: string;
    userId: string;
}>> & import("mongoose").FlatRecord<{
    location: string;
    start: NativeDate;
    end: NativeDate;
    description: string;
    title: string;
    userId: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
