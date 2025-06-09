import { Document, Types } from 'mongoose';
export type EventDocument = Event & Document;
export declare enum EventType {
    CONCERTS = "Concerts",
    WORKSHOPS = "Workshops",
    NETWORKING = "Networking Events",
    SPORTS = "Sports Activities",
    CULTURAL = "Cultural Festivals",
    TECH = "Tech Meetups",
    ART = "Art Exhibitions",
    OTHER = "Other"
}
export declare class Event {
    title: string;
    description: string;
    creatorId: Types.ObjectId;
    startDate: Date;
    endDate: Date;
    location: string;
    participants: Types.ObjectId[];
    joinPrice: number;
    conversationId: Types.ObjectId;
    type: EventType;
    imagePath: string;
}
export declare const EventSchema: import("mongoose").Schema<Event, import("mongoose").Model<Event, any, any, any, Document<unknown, any, Event> & Event & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Event, Document<unknown, {}, import("mongoose").FlatRecord<Event>> & import("mongoose").FlatRecord<Event> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
