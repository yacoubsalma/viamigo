import { Document } from 'mongoose';
export declare class ReelMedia extends Document {
    userId: string;
    eventId: string;
    mediaUrls: string[];
    isShared: boolean;
    music?: string;
}
export declare const ReelMediaSchema: import("mongoose").Schema<ReelMedia, import("mongoose").Model<ReelMedia, any, any, any, Document<unknown, any, ReelMedia> & ReelMedia & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReelMedia, Document<unknown, {}, import("mongoose").FlatRecord<ReelMedia>> & import("mongoose").FlatRecord<ReelMedia> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
