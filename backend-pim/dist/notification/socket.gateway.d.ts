import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { UsersService } from 'src/users/users.service';
export declare class NotificationGateway {
    private readonly notificationService;
    private readonly usersService;
    server: Server;
    constructor(notificationService: NotificationService, usersService: UsersService);
    handleJoin(userId: string, client: Socket): void;
    sendNotification({ senderId, recipientId, type, content, data, }: {
        senderId: string;
        recipientId: string;
        type: string;
        content: string;
        data?: Record<string, string>;
    }): Promise<void>;
}
