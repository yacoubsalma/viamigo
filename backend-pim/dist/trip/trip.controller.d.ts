import { TripService } from './trip.service';
export declare class TripController {
    private readonly tripService;
    constructor(tripService: TripService);
    generateItinerary(destination: string, startDate: string, endDate: string, userId: string): Promise<{
        itinerary: any[];
        coinsRemaining: number;
        message: string;
    }>;
    updateTripDay(userId: string, dayIndex: number, newActivities: string[]): Promise<{
        message: string;
        updatedItinerary: any[];
    }>;
    acceptTrip(userId: string, destination: string, startDate: string, endDate: string, itinerary: any[]): Promise<{
        tripId: unknown;
        message: string;
    }>;
    getAcceptedTrips(userId: string): Promise<import("./entities/trip.entity").Trip[]>;
}
