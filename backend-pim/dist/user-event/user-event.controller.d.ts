import { UserEventService } from './user-event.service';
export declare class UserEventController {
    private readonly userEventService;
    constructor(userEventService: UserEventService);
    create(userId: string, events: any[]): Promise<{
        message: string;
        data: import("./entities/user-event.entity").UserEvent[];
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: import("./entities/user-event.entity").UserEvent[];
    }>;
}
