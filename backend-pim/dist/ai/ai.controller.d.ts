import { AIService } from './ai.service';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    getPersonalizedByBehavior(userId: string): Promise<{
        success: boolean;
        recommendations: {
            recommendations: string[];
            lockedPlaces: any[];
        };
    }>;
    getPersonalizedByBehaviorv2(userId: string): Promise<{
        success: boolean;
        recommendations: string[];
        lockedPlaces: any[];
    }>;
    getPlacesBySearch(userId: string): Promise<{
        accessiblePlaces: any[];
        lockedPlaces: any[];
        success: boolean;
    }>;
    generatePoster(description: string): Promise<{
        image: string;
    }>;
    generatePosterWithFlux(body: {
        description: string;
        title: string;
        startDate: string;
        endDate: string;
        location: string;
    }): Promise<{
        image: string;
    }>;
}
