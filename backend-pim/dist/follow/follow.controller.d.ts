import { FollowService } from './follow.service';
export declare class FollowController {
    private followService;
    constructor(followService: FollowService);
    follow(body: {
        follower: string;
        following: string;
    }): Promise<any>;
    unfollow(body: {
        follower: string;
        following: string;
    }): Promise<any>;
    getFollowersCount(userId: string): Promise<{
        followersCount: number;
    }>;
    getFollowingCount(userId: string): Promise<{
        followingCount: number;
    }>;
    getFollowers(userId: string): Promise<{
        followers: string[];
    }>;
    getFollowing(userId: string): Promise<{
        following: string[];
    }>;
}
