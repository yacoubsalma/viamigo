import { Model } from 'mongoose';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationGateway } from './socket.gateway';
export declare class NotificationService {
    private notificationModel;
    private readonly gateway;
    constructor(notificationModel: Model<Notification>, gateway: NotificationGateway);
    sendSimple(userId: string, message: string): Promise<void>;
    createNotification(createNotificationDto: CreateNotificationDto): Promise<import("mongoose").Document<unknown, {}, Notification> & Notification & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getUserNotifications(userId: string): Promise<(import("mongoose").Document<unknown, {}, Notification> & Notification & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    markAsRead(notificationId: string): Promise<import("mongoose").Document<unknown, {}, Notification> & Notification & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteNotification(notificationId: string): Promise<import("mongoose").Document<unknown, {}, Notification> & Notification & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    countUnreadNotifications(userId: string): Promise<number>;
    deleteNotificationsByUser(userId: string): Promise<void>;
}
