import { Model } from 'mongoose';
import { UserDocument } from 'src/users/entities/user.entity';
import { CarnetDocument } from 'src/carnet/entities/carnet.entity';
import { ConfigService } from '@nestjs/config';
export declare class AIService {
    private userModel;
    private carnetModel;
    private preferenceModel;
    private configService;
    private apiKey;
    constructor(userModel: Model<UserDocument>, carnetModel: Model<CarnetDocument>, preferenceModel: Model<any>, configService: ConfigService);
    getBehaviorBasedRecommendations(userId: string): Promise<string[]>;
    getBehaviorBasedRecommendationsv3(userId: string): Promise<{
        recommendations: string[];
        lockedPlaces: any[];
    }>;
    getFilteredPlacesByUserSearch(userId: string): Promise<{
        accessiblePlaces: any[];
        lockedPlaces: any[];
    }>;
    getFilteredPlacesByUserSearchv2(userId: string): Promise<{
        accessiblePlaces: any[];
        lockedPlaces: any[];
    }>;
    generateImage(prompt: string): Promise<string>;
    generateImageWithFlux(eventTitle: string, startDate: string, endDate: string, location: string, description: string): Promise<string>;
}
