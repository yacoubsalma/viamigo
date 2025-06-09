import { EventService } from 'src/event/event.service';
import { UsersService } from 'src/users/users.service';
import { NotificationService } from 'src/notification/notification.service';
export declare class CalendarService {
    private readonly eventService;
    private readonly userService;
    private readonly notificationService;
    constructor(eventService: EventService, userService: UsersService, notificationService: NotificationService);
    handleRecommendation(): Promise<void>;
}
