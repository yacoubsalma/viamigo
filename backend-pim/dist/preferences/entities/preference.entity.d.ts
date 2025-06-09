import { Document, Types } from 'mongoose';
export type PreferenceDocument = Preference & Document;
export declare class Preference extends Document {
    user: Types.ObjectId;
    gender?: string;
    favoriteActivities?: string[];
    eventPreferences?: string[];
    socialPreference?: string;
    preferredEventTime?: string;
}
export declare const PreferenceSchema: import("mongoose").Schema<Preference, import("mongoose").Model<Preference, any, any, any, Document<unknown, any, Preference> & Preference & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Preference, Document<unknown, {}, import("mongoose").FlatRecord<Preference>> & import("mongoose").FlatRecord<Preference> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
