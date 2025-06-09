import { Model } from 'mongoose';
import { ReelMedia } from './entities/reel.entity';
export declare class ReelService {
    private reelModel;
    constructor(reelModel: Model<ReelMedia>);
    saveReel(data: {
        eventId: string;
        userId: string;
        mediaUrls: string[];
        isShared: boolean;
        music?: string | null;
    }): Promise<ReelMedia>;
    findReelsByEvent(eventId: string): Promise<(import("mongoose").Document<unknown, {}, ReelMedia> & ReelMedia & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    generateReel(eventId: string, userId: string): Promise<string>;
    generateVideo(eventId: string): Promise<string>;
    addMusicToReel(eventId: string, musicFilename: string): Promise<string>;
    deleteReelsByUser(userId: string): Promise<void>;
}
