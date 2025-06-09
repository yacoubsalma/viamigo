import { Document } from 'mongoose';
export declare class Trip extends Document {
    userId: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    itinerary: any[];
    status: string;
    totalActivities: number;
    numberOfDays: number;
}
export declare const TripSchema: import("mongoose").Schema<Trip, import("mongoose").Model<Trip, any, any, any, Document<unknown, any, Trip> & Trip & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Trip, Document<unknown, {}, import("mongoose").FlatRecord<Trip>> & import("mongoose").FlatRecord<Trip> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
