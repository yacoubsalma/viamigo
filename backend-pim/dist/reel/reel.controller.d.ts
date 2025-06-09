import { ReelService } from './reel.service';
export declare class ReelController {
    private readonly reelsService;
    constructor(reelsService: ReelService);
    uploadReel(eventId: string, userId: string, isShared: boolean, files: {
        files?: Express.Multer.File[];
        music?: Express.Multer.File[];
    }): Promise<import("./entities/reel.entity").ReelMedia>;
    generateReel(eventId: string, userId: string): Promise<{
        message: string;
        path: string;
    }>;
    getReels(eventId: string): Promise<{
        videoUrl: string;
        userId: string;
        eventId: string;
        mediaUrls: string[];
        isShared: boolean;
        music?: string;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    addMusic(eventId: string, musicFileName: string): Promise<{
        message: string;
        path: string;
    }>;
    uploadMusic(file: Express.Multer.File): Promise<{
        message: string;
        filename: string;
    }>;
}
