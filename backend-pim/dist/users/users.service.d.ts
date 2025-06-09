import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { Preference } from 'src/preferences/entities/preference.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { CarnetService } from 'src/carnet/carnet.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { EventService } from 'src/event/event.service';
import { ChatService } from 'src/chat/chat.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { FollowService } from 'src/follow/follow.service';
import { FreeTimeService } from 'src/free-times/free-times.service';
import { MessageService } from 'src/message/message.service';
import { NotificationService } from 'src/notification/notification.service';
import { ReelService } from 'src/reel/reel.service';
import { ReviewService } from 'src/review/review.service';
import { TripService } from 'src/trip/trip.service';
import { UserEventService } from 'src/user-event/user-event.service';
export declare class UsersService {
    private userModel;
    private preferenceModel;
    private readonly mailerService;
    private readonly carnetService;
    private readonly preferenceService;
    private readonly eventService;
    private readonly chatService;
    private readonly conversationService;
    private readonly followService;
    private readonly freeTimeService;
    private readonly messageService;
    private readonly notificationService;
    private readonly reelService;
    private readonly reviewService;
    private readonly tripService;
    private readonly userEventService;
    constructor(userModel: Model<User>, preferenceModel: Model<Preference>, mailerService: MailerService, carnetService: CarnetService, preferenceService: PreferencesService, eventService: EventService, chatService: ChatService, conversationService: ConversationService, followService: FollowService, freeTimeService: FreeTimeService, messageService: MessageService, notificationService: NotificationService, reelService: ReelService, reviewService: ReviewService, tripService: TripService, userEventService: UserEventService);
    create(user: Partial<User>, preferences: Partial<Preference>): Promise<User>;
    validateOtp(email: string, otp: string): Promise<boolean>;
    findAllExceptCreator(creatorId: string): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    sendVerificationEmail(email: string, userId: string): Promise<void>;
    verifyUserEmail(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    addUserPreferences(userId: string, preferences: Partial<Preference>): Promise<Preference>;
    getUserPreferencesById(userId: string): Promise<Preference>;
    updateAvailability(userId: string, availability: any[]): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAllWithAvailability(): Promise<User[]>;
    update(id: string, updateData: Partial<User>): Promise<User>;
    updateUserPreferences(userId: string, preferences: Partial<Preference>): Promise<Preference>;
    getPublicProfile(userId: string): Promise<any>;
    delete(id: string): Promise<User>;
    forgotPassword(email: string): Promise<string>;
    resetPasswordWithOtp(email: string, otp: string, newPassword: string): Promise<string>;
    unlockPlace(userId: string, placeId: string): Promise<{
        message: string;
        coinsRemaining: number;
        ownerCoins: number;
    }>;
    getUnlockedPlaces(userId: string): Promise<string[]>;
    getAllUsers(): Promise<User[]>;
    addPlaceToFavorites(userId: string, placeId: string): Promise<User>;
    addUserPreference(userId: string, preferenceId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateUser(userId: string, updateData: Partial<User>): Promise<User>;
    addUserFavorite(userId: string, placeId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removePlaceFromFavorites(userId: string, placeId: string): Promise<User>;
}
