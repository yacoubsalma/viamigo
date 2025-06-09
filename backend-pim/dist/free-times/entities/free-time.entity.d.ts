import { Document, Types } from 'mongoose';
export declare class FreeTime extends Document {
    userId: Types.ObjectId;
    start: Date;
    end: Date;
}
export declare const FreeTimeSchema: import("mongoose").Schema<FreeTime, import("mongoose").Model<FreeTime, any, any, any, Document<unknown, any, FreeTime> & FreeTime & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FreeTime, Document<unknown, {}, import("mongoose").FlatRecord<FreeTime>> & import("mongoose").FlatRecord<FreeTime> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
