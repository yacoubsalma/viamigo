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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const follow_entity_1 = require("./entities/follow.entity");
const user_entity_1 = require("../users/entities/user.entity");
const socket_gateway_1 = require("../notification/socket.gateway");
const notification_entity_1 = require("../notification/entities/notification.entity");
let FollowService = class FollowService {
    constructor(userModel, followModel, socketGateway) {
        this.userModel = userModel;
        this.followModel = followModel;
        this.socketGateway = socketGateway;
    }
    async followUser(followerId, followingId) {
        if (followerId === followingId) {
            throw new common_1.BadRequestException("You can't follow yourself!");
        }
        const followExists = await this.followModel.findOne({ follower: followerId, following: followingId });
        if (followExists) {
            throw new common_1.ConflictException('Already following this user.');
        }
        const newFollow = new this.followModel({ follower: followerId, following: followingId });
        await newFollow.save();
        this.socketGateway.sendNotification({
            senderId: followerId,
            recipientId: followingId.toString(),
            type: notification_entity_1.NotificationType.FOLLOW,
            content: 'Guess what? You’ve got a new follower!',
            data: { followerId: followerId.toString() },
        });
        return { message: 'Follow successful' };
    }
    async unfollowUser(followerId, followingId) {
        const follow = await this.followModel.findOneAndDelete({ follower: followerId, following: followingId });
        if (!follow) {
            throw new common_1.NotFoundException("You are not following this user.");
        }
        return { message: 'Unfollow successful' };
    }
    async getFollowersCount(userId) {
        return await this.followModel.countDocuments({ following: userId });
    }
    async getFollowingCount(userId) {
        return await this.followModel.countDocuments({ follower: userId });
    }
    async getFollowers(userId) {
        const followers = await this.followModel.find({ following: userId });
        return followers.map((f) => f.follower.toString());
    }
    async getFollowing(userId) {
        const following = await this.followModel.find({ follower: userId });
        return following.map((f) => f.following.toString());
    }
    async getUserWithFollowStats(userId) {
        const followers = await this.followModel.countDocuments({ following: userId });
        const following = await this.followModel.countDocuments({ follower: userId });
        const user = await this.userModel.findById(userId).lean();
        return {
            ...user,
            followersCount: followers,
            followingCount: following,
        };
    }
    async deleteFollowRelationsByUser(userId) {
        await this.followModel.deleteMany({ follower: userId }).exec();
        await this.followModel.deleteMany({ following: userId }).exec();
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(follow_entity_1.Follow.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        socket_gateway_1.NotificationGateway])
], FollowService);
//# sourceMappingURL=follow.service.js.map