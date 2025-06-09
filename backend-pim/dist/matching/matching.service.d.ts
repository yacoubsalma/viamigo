import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { PreferenceDocument } from 'src/preferences/entities/preference.entity';
export declare class MatchingService {
    private readonly userModel;
    private readonly preferenceModel;
    constructor(userModel: Model<UserDocument>, preferenceModel: Model<PreferenceDocument>);
    matchUserWithDatabase(userId: string): Promise<any[]>;
    matchUser(userId: string): Promise<{
        profile: string;
    }>;
    buildUserProfile(user: any, preference: any): string;
    matchUsers(userProfile: string, candidates: {
        id: string;
        name: string;
        tags: string;
    }[]): Promise<any[]>;
}
