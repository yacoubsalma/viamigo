import { Document } from 'mongoose';
export type UserActivityDocument = UserActivity & Document;
export declare class UserActivity {
    userId: string;
    type: string;
    value: string;
    timestamp: Date;
}
export declare const UserActivitySchema: import("mongoose").Schema<UserActivity, import("mongoose").Model<UserActivity, any, any, any, Document<unknown, any, UserActivity> & UserActivity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserActivity, Document<unknown, {}, import("mongoose").FlatRecord<UserActivity>> & import("mongoose").FlatRecord<UserActivity> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
