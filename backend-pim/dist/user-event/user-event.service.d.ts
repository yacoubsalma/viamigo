import { Model } from 'mongoose';
import { UserEvent } from './entities/user-event.entity';
export declare class UserEventService {
    private readonly userEventModel;
    constructor(userEventModel: Model<UserEvent>);
    createUserEvents(userId: string, events: any[]): Promise<UserEvent[]>;
    getUserEvents(userId: string): Promise<UserEvent[]>;
    deleteUserEventsByUser(userId: string): Promise<void>;
}
