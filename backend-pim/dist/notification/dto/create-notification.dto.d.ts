import { NotificationType, NotificationCategory } from '../entities/notification.entity';
export declare class CreateNotificationDto {
    type: NotificationType;
    category?: NotificationCategory;
    title?: string;
    message: string;
    sender: string;
    recipient: string;
    data?: Record<string, string>;
}
