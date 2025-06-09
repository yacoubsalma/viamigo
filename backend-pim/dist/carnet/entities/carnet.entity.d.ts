import { Document } from 'mongoose';
export type CarnetDocument = Carnet & Document;
export declare class Place extends Document {
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    categories: string[];
    unlockCost: number;
    images: string[];
    averageRating: number;
}
export declare class Carnet extends Document {
    title: string;
    owner: string;
    places: Place[];
    globalAverageRating: number;
}
export declare const CarnetSchema: import("mongoose").Schema<Carnet, import("mongoose").Model<Carnet, any, any, any, Document<unknown, any, Carnet> & Carnet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Carnet, Document<unknown, {}, import("mongoose").FlatRecord<Carnet>> & import("mongoose").FlatRecord<Carnet> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
