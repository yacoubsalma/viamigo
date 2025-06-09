import { Model } from 'mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { CarnetDocument } from 'src/carnet/entities/carnet.entity';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class ReviewService {
    private reviewModel;
    private carnetModel;
    private userModel;
    constructor(reviewModel: Model<ReviewDocument>, carnetModel: Model<CarnetDocument>, userModel: Model<UserDocument>);
    addReview(placeId: string, userId: string, rating: number, comment?: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    calculateAverageRating(placeId: string): Promise<number>;
    updatePlaceRating(placeId: string): Promise<void>;
    calculateGlobalAverageRating(carnet: CarnetDocument): number;
    getReviews(placeId: string): Promise<(import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAverageRating(placeId: string): Promise<number>;
    getGlobalAverageRating(carnetId: string): Promise<number>;
    editReview(placeId: string, userId: string, rating: number, comment?: string): Promise<import("mongoose").Document<unknown, {}, ReviewDocument> & Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteReviewsByUser(userId: string): Promise<void>;
}
