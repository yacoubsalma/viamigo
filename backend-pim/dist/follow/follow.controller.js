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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async follow(body) {
        try {
            return await this.followService.followUser(body.follower, body.following);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                return { message: "Already following this user." };
            }
            throw error;
        }
    }
    async unfollow(body) {
        return this.followService.unfollowUser(body.follower, body.following);
    }
    async getFollowersCount(userId) {
        const count = await this.followService.getFollowersCount(userId);
        console.log('followers' + count);
        return { followersCount: count };
    }
    async getFollowingCount(userId) {
        const count = await this.followService.getFollowingCount(userId);
        console.log('followingggg' + count);
        return { followingCount: count };
    }
    async getFollowers(userId) {
        const followers = await this.followService.getFollowers(userId);
        console.log(userId + ' is following' + followers);
        return { followers };
    }
    async getFollowing(userId) {
        const following = await this.followService.getFollowing(userId);
        console.log(userId + ' is following' + following);
        return { following };
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollow", null);
__decorate([
    (0, common_1.Get)('followers/count/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowersCount", null);
__decorate([
    (0, common_1.Get)('following/count/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowingCount", null);
__decorate([
    (0, common_1.Get)('followers/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowers", null);
__decorate([
    (0, common_1.Get)('following/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowing", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('follow'),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map