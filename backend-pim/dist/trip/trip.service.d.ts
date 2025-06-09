import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { Trip } from './entities/trip.entity';
import { NotificationService } from 'src/notification/notification.service';
export declare class TripService {
    private readonly notificationService;
    private readonly userModel;
    private readonly tripModel;
    private genAI;
    private model;
    private readonly TRIP_GENERATION_COST;
    constructor(notificationService: NotificationService, userModel: Model<User>, tripModel: Model<Trip>);
    acceptTrip(userId: string, destination: string, startDate: Date, endDate: Date, itinerary: any[]): Promise<Trip>;
    generateItinerary(destination: string, days: number, userId: string, startDate: Date, regenerate?: boolean): Promise<{
        itinerary: any[];
        coinsRemaining: number;
    }>;
    private parseItinerary;
    updateTripDay(userId: string, dayIndex: number, newActivities: string[]): Promise<{
        itinerary: any[];
    }>;
    deleteTripsByUser(userId: string): Promise<void>;
    getAcceptedTrips(userId: string): Promise<Trip[]>;
}
