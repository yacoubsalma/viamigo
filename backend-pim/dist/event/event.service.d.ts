import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Event, EventDocument, EventType } from './entities/event.entity';
import { UserDocument } from 'src/users/entities/user.entity';
import { ConversationService } from 'src/conversation/conversation.service';
import { NotificationGateway } from 'src/notification/socket.gateway';
import { UsersService } from 'src/users/users.service';
import { PreferenceDocument } from 'src/preferences/entities/preference.entity';
import { FreeTimeService } from 'src/free-times/free-times.service';
export declare class EventService {
    private eventModel;
    private userModel;
    private readonly usersService;
    private conversationService;
    private readonly socketGateway;
    private readonly freeTimeService;
    private preferenceModel;
    constructor(eventModel: Model<EventDocument>, userModel: Model<UserDocument>, usersService: UsersService, conversationService: ConversationService, socketGateway: NotificationGateway, freeTimeService: FreeTimeService, preferenceModel: Model<PreferenceDocument>);
    createEvent(creatorId: string, title: string, description: string, startDate: string, endDate: string, location: string, joinPrice: number, type: EventType, imagePath?: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findEventsBetween(start: Date, end: Date): Promise<Event[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    isUserJoined(eventId: string, userId: string): Promise<boolean>;
    findAll(userId: string): Promise<(import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAllEvents(): Promise<{
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
    joinEvent(eventId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getEventsByUser(userId: string): Promise<Event[]>;
    updateEvent(eventId: string, updateData: {
        title?: string;
        description?: string;
        startDate?: string;
        endDate?: string;
        location?: string;
        joinPrice?: number;
    }): Promise<import("mongoose").Document<unknown, {}, EventDocument> & Event & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteEvent(eventId: string): Promise<{
        message: string;
    }>;
    findSpecificEvents(userId: string): Promise<Event[]>;
    findEventsDuringUserFreeTime(userId: string): Promise<Event[]>;
    findNonConflictingEvents(userId: Types.ObjectId): Promise<Event[]>;
    deleteEventsByUser(userId: string): Promise<void>;
    getEventsCreatedByUser(userId: string): Promise<Event[]>;
    leaveEvent(eventId: string, userId: string): Promise<{
        message: string;
    }>;
}
