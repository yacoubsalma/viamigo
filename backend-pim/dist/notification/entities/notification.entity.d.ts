import { Document } from 'mongoose';
export declare enum NotificationType {
    INVITATION = "INVITATION",
    NEW_PLACE = "NEW_PLACE",
    NEW_Event = "NEW_Event",
    NEW_EVENT_All = "NEW_EVENT_All",
    MESSAGE = "MESSAGE",
    FOLLOW = "FOLLOW",
    INFO = "INFO"
}
export declare enum NotificationCategory {
    SOCIAL = "SOCIAL",
    SYSTEM = "SYSTEM",
    PROMOTION = "PROMOTION"
}
export declare class Notification extends Document {
    type: NotificationType;
    category: NotificationCategory;
    message: string;
    sender: string;
    recipient: string;
    isRead: boolean;
    data: Record<string, string>;
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, Document<unknown, any, Notification> & Notification & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, Document<unknown, {}, import("mongoose").FlatRecord<Notification>> & import("mongoose").FlatRecord<Notification> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
