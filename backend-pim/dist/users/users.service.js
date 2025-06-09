"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const preference_entity_1 = require("../preferences/entities/preference.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const carnet_service_1 = require("../carnet/carnet.service");
const mongoose_3 = require("mongoose");
const preferences_service_1 = require("../preferences/preferences.service");
const inspector_1 = require("inspector");
const event_service_1 = require("../event/event.service");
const chat_service_1 = require("../chat/chat.service");
const conversation_service_1 = require("../conversation/conversation.service");
const follow_service_1 = require("../follow/follow.service");
const free_times_service_1 = require("../free-times/free-times.service");
const message_service_1 = require("../message/message.service");
const notification_service_1 = require("../notification/notification.service");
const reel_service_1 = require("../reel/reel.service");
const review_service_1 = require("../review/review.service");
const trip_service_1 = require("../trip/trip.service");
const user_event_service_1 = require("../user-event/user-event.service");
let UsersService = class UsersService {
    constructor(userModel, preferenceModel, mailerService, carnetService, preferenceService, eventService, chatService, conversationService, followService, freeTimeService, messageService, notificationService, reelService, reviewService, tripService, userEventService) {
        this.userModel = userModel;
        this.preferenceModel = preferenceModel;
        this.mailerService = mailerService;
        this.carnetService = carnetService;
        this.preferenceService = preferenceService;
        this.eventService = eventService;
        this.chatService = chatService;
        this.conversationService = conversationService;
        this.followService = followService;
        this.freeTimeService = freeTimeService;
        this.messageService = messageService;
        this.notificationService = notificationService;
        this.reelService = reelService;
        this.reviewService = reviewService;
        this.tripService = tripService;
        this.userEventService = userEventService;
    }
    async create(user, preferences) {
        try {
            if (!user || !user.password) {
                throw new common_1.BadRequestException('Invalid user data. Password is required.');
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new this.userModel({
                ...user,
                password: hashedPassword,
                isVerified: false,
            });
            const savedUser = await newUser.save();
            inspector_1.console.log("🟢 User successfully saved:", savedUser);
            inspector_1.console.log("🟢 Generated User ID:", savedUser._id);
            await savedUser.save();
            inspector_1.console.log("✅ Preferences linked to User:", savedUser._id);
            await this.sendVerificationEmail(savedUser.email, savedUser._id.toString());
            return savedUser;
        }
        catch (error) {
            inspector_1.console.error("❌ Error creating user:", error);
            throw new common_1.InternalServerErrorException(`Error creating user: ${error.message}`);
        }
    }
    async validateOtp(email, otp) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            return false;
        if (user.resetPasswordOtp !== otp)
            return false;
        if (user.resetPasswordOtpExpires && user.resetPasswordOtpExpires < new Date())
            return false;
        return true;
    }
    async findAllExceptCreator(creatorId) {
        return await this.userModel.find({ _id: { $ne: creatorId } });
    }
    async sendVerificationEmail(email, userId) {
        inspector_1.console.log(`🟢 Preparing to send email to: ${email}, User ID: ${userId}`);
        if (!userId) {
            inspector_1.console.error("❌ ERROR: userId is undefined in sendVerificationEmail!");
            throw new Error("userId is undefined in sendVerificationEmail");
        }
        const verificationLink = `http://localhost:3000/auth/confirm/${userId}`;
        inspector_1.console.log(`🟢 Generated Verification Link: ${verificationLink}`);
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Verify Your Email',
                template: './welcome-email',
                context: {
                    verificationLink,
                    userId
                },
            });
            inspector_1.console.log("✅ Email sent successfully!");
        }
        catch (error) {
            inspector_1.console.error("❌ ERROR sending email:", error.message);
            throw new Error(`Email sending failed: ${error.message}`);
        }
    }
    async verifyUserEmail(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            return null;
        }
        if (user.isVerified) {
            inspector_1.console.log("✅ User already verified.");
            return user;
        }
        user.isVerified = true;
        await user.save();
        inspector_1.console.log(`✅ User ${id} is now verified.`);
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).populate('preferences').exec();
    }
    async addUserPreferences(userId, preferences) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const existingPreferences = await this.preferenceModel.findOne({ user: userId });
        if (existingPreferences) {
            throw new common_1.BadRequestException('Preferences already exist for this user');
        }
        const newPreferences = new this.preferenceModel({
            user: userId,
            ...preferences,
        });
        const savedPreferences = await newPreferences.save();
        user.preferences = new mongoose_3.Types.ObjectId(savedPreferences._id.toString());
        await user.save();
        await this.preferenceService.generateTagsFromPreferences(userId);
        return savedPreferences;
    }
    async getUserPreferencesById(userId) {
        const preferences = await this.preferenceModel.findOne({ user: userId }).exec();
        if (!preferences) {
            throw new common_1.NotFoundException('Preferences not found for this user');
        }
        return preferences;
    }
    async updateAvailability(userId, availability) {
        return this.userModel.findByIdAndUpdate(userId, {
            availability: availability,
        });
    }
    async findAllWithAvailability() {
        return this.userModel.find({ disponibilites: { $exists: true } }).exec();
    }
    async update(id, updateData) {
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    async updateUserPreferences(userId, preferences) {
        const updatedPreferences = await this.preferenceModel.findOneAndUpdate({ user: userId }, { $set: preferences }, { new: true }).exec();
        if (!updatedPreferences) {
            throw new common_1.NotFoundException('Preferences not found for this user');
        }
        return updatedPreferences;
    }
    async getPublicProfile(userId) {
        const user = await this.userModel.findById(userId).lean();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const followersCount = await this.followService.getFollowersCount(userId);
        const carnet = await this.carnetService.getCarnetByUserId(userId);
        const rating = carnet?.globalAverageRating ?? 0;
        return {
            name: user.name,
            bio: user.bio,
            job: user.job,
            location: user.location,
            profileImage: user.profileImage,
            tags: user.tags,
            followersCount,
            rating,
        };
    }
    async delete(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.carnetId) {
            await this.carnetService.deleteCarnet(user.carnetId, id);
        }
        await this.eventService.deleteEventsByUser(id);
        await this.chatService.deleteChatsByUser(id);
        await this.conversationService.deleteConversationsByUser(id);
        await this.followService.deleteFollowRelationsByUser(id);
        await this.freeTimeService.deleteFreeTimesByUser(id);
        await this.messageService.deleteMessagesByUser(id);
        await this.notificationService.deleteNotificationsByUser(id);
        await this.preferenceService.deletePreferencesByUser(id);
        await this.reelService.deleteReelsByUser(id);
        await this.reviewService.deleteReviewsByUser(id);
        await this.tripService.deleteTripsByUser(id);
        await this.userEventService.deleteUserEventsByUser(id);
        return this.userModel.findByIdAndDelete(id).exec();
    }
    async forgotPassword(email) {
        inspector_1.console.log('Received email for password reset:', email);
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpires = new Date(Date.now() + 3600000);
        await user.save();
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Password Reset OTP',
            template: './reset-password-otp',
            context: { name: user.name, otp },
        });
        return 'Password reset OTP sent to your email';
    }
    async resetPasswordWithOtp(email, otp, newPassword) {
        const user = await this.userModel.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordOtpExpires: { $gt: new Date() },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid or expired OTP');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpires = null;
        await user.save();
        return 'Password reset successful';
    }
    async unlockPlace(userId, placeId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.unlockedPlaces.includes(placeId)) {
            throw new common_1.BadRequestException('Place already unlocked');
        }
        if (user.coins < 5) {
            throw new common_1.BadRequestException('Not enough coins to unlock this place');
        }
        const ownerId = await this.carnetService.getOwnerByPlace(placeId);
        if (!ownerId) {
            throw new common_1.NotFoundException('Carnet not found for this place');
        }
        user.coins -= 5;
        user.unlockedPlaces.push(placeId);
        await user.save();
        const owner = await this.userModel.findById(ownerId);
        if (owner) {
            owner.coins += 10;
            await owner.save();
        }
        return {
            message: 'Place unlocked successfully',
            coinsRemaining: user.coins,
            ownerCoins: owner ? owner.coins : 0
        };
    }
    async getUnlockedPlaces(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.unlockedPlaces;
    }
    async getAllUsers() {
        return this.userModel.find().exec();
    }
    async addPlaceToFavorites(userId, placeId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const placeObjectId = new mongoose_3.Types.ObjectId(placeId);
        if (user.favorites.includes(placeObjectId)) {
            throw new common_1.BadRequestException('Place already in favorites');
        }
        user.favorites.push(placeObjectId);
        await user.save();
        return user;
    }
    async addUserPreference(userId, preferenceId) {
        return this.userModel.findByIdAndUpdate(userId, { $set: { preferences: preferenceId } });
    }
    async updateUser(userId, updateData) {
        return this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
    }
    async addUserFavorite(userId, placeId) {
        return this.userModel.findByIdAndUpdate(userId, { $push: { favorites: placeId } });
    }
    async removePlaceFromFavorites(userId, placeId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const placeObjectId = new mongoose_3.Types.ObjectId(placeId);
        if (!user.favorites.some(id => id.equals(placeObjectId))) {
            throw new common_1.BadRequestException('Place not found in favorites');
        }
        user.favorites = user.favorites.toObject().filter(id => !id.equals(placeObjectId));
        await user.save();
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(preference_entity_1.Preference.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mailer_1.MailerService,
        carnet_service_1.CarnetService,
        preferences_service_1.PreferencesService,
        event_service_1.EventService,
        chat_service_1.ChatService,
        conversation_service_1.ConversationService,
        follow_service_1.FollowService,
        free_times_service_1.FreeTimeService,
        message_service_1.MessageService,
        notification_service_1.NotificationService,
        reel_service_1.ReelService,
        review_service_1.ReviewService,
        trip_service_1.TripService,
        user_event_service_1.UserEventService])
], UsersService);
//# sourceMappingURL=users.service.js.map