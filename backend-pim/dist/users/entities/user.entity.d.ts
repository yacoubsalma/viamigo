import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    resetPasswordOtp: string | null;
    resetPasswordOtpExpires: Date | null;
    bio: string;
    job: string;
    location: string;
    profileImage: string;
    likes: number;
    coins: number;
    carnetId: string | null;
    unlockedCarnets: string[];
    unlockedPlaces: string[];
    preferences: Types.ObjectId | null;
    isVerified: boolean;
    favorites: Types.Array<Types.ObjectId>;
    interactions: string[];
    searchHistory: string[];
    tags: string[];
    availability: {
        start: string;
        end: string;
    }[];
    itinerary: {
        activities: string[];
    }[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
