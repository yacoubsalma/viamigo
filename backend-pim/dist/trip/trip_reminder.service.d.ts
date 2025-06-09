import { Model } from 'mongoose';
import { Trip } from './entities/trip.entity';
import { NotificationService } from 'src/notification/notification.service';
export declare class TripReminderService {
    private readonly tripModel;
    private readonly notificationService;
    private readonly logger;
    constructor(tripModel: Model<Trip>, notificationService: NotificationService);
    sendTripReminders(): Promise<void>;
}
