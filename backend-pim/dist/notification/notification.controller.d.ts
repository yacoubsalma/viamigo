import { HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification> & import("./entities/notification.entity").Notification & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getUserNotifications(userId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification> & import("./entities/notification.entity").Notification & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    markAsRead(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./entities/notification.entity").Notification> & import("./entities/notification.entity").Notification & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    delete(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    countUnreadNotifications(userId: string): Promise<{
        statusCode: HttpStatus;
        unreadCount: number;
    }>;
}
