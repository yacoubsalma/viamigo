import { EventService } from './event.service';
import { EventType, Event as CustomEventEntity } from './entities/event.entity';
import { Types } from 'mongoose';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    isUserJoined(eventId: string, userId: string): Promise<{
        joined: boolean;
    }>;
    create(body: {
        creatorId: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        location: string;
        joinPrice?: number;
        type: EventType;
        imagePath?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & CustomEventEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & CustomEventEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        participantNames: any[];
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
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    findAlluser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & CustomEventEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAllEvents(): Promise<CustomEventEntity[]>;
    join(id: string, body: {
        userId: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & CustomEventEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getByUser(userId: string): Promise<CustomEventEntity[]>;
    update(id: string, body: {
        title?: string;
        description?: string;
        date?: string;
        location?: string;
        joinPrice?: number;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/event.entity").EventDocument> & CustomEventEntity & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    findSpecificEvents(userId: string): Promise<CustomEventEntity[]>;
    suggestForUser(userId: string): Promise<CustomEventEntity[]>;
    getEventsDuringUserFreeTime(userId: string): Promise<CustomEventEntity[]>;
    getNonConflictingEvents(userId: string): Promise<CustomEventEntity[]>;
    getCreatedByUser(userId: string): Promise<CustomEventEntity[]>;
    leaveEvent(eventId: string, userId: string): Promise<{
        message: string;
    }>;
}
