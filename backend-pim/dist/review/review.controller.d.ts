import { ReviewService } from './review.service';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    addReview(placeId: string, reviewData: {
        userId: string;
        rating: number;
        comment?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./entities/review.entity").ReviewDocument> & import("./entities/review.entity").Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getReviews(placeId: string): Promise<(import("mongoose").Document<unknown, {}, import("./entities/review.entity").ReviewDocument> & import("./entities/review.entity").Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAverageRating(placeId: string): Promise<number>;
    getGlobalAverageRating(carnetId: string): Promise<number>;
    updateReview(placeId: string, userId: string, rating: number, comment?: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/review.entity").ReviewDocument> & import("./entities/review.entity").Review & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
