import { Model } from 'mongoose';
import { UserActivityDocument } from './entities/user-activity.entity.ts';
import { UsersService } from 'src/users/users.service';
import { UserDocument } from 'src/users/entities/user.entity.js';
export declare class AnalyseIaService {
    private activityModel;
    private preferenceModel;
    private readonly userModel;
    private readonly usersService;
    private apiKey;
    private readonly logger;
    constructor(activityModel: Model<UserActivityDocument>, preferenceModel: Model<any>, userModel: Model<UserDocument>, usersService: UsersService);
    logActivity(userId: string, type: string, value: string): Promise<void>;
    analyseUser(userId: string): Promise<string[]>;
    analyseAllUsers(): Promise<void>;
    handleCron(): Promise<void>;
}
