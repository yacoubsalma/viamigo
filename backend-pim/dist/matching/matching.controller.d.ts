import { MatchingService } from './matching.service';
export declare class MatchingController {
    private readonly matchingService;
    constructor(matchingService: MatchingService);
    matchUser(userId: string): Promise<{
        success: boolean;
        results: any[];
    }>;
    showUserProfile(userId: string): Promise<{
        profile: string;
    }>;
}
