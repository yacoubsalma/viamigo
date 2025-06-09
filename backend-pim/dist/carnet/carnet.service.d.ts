import { Model } from 'mongoose';
import { Carnet, CarnetDocument, Place } from './entities/carnet.entity';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class CarnetService {
    private carnetModel;
    private userModel;
    constructor(carnetModel: Model<CarnetDocument>, userModel: Model<UserDocument>);
    addPlace(carnetId: string, placeData: any): Promise<Carnet>;
    createCarnet(data: any): Promise<Carnet>;
    getUserCarnet(userId: string): Promise<any>;
    createCarnetForUser(userId: string, title: string): Promise<Carnet>;
    addPlaceToUserCarnet(userId: string, placeData: any): Promise<Carnet>;
    getAllCarnets(): Promise<Carnet[]>;
    getCarnetByUserId(userId: string): Promise<Carnet | null>;
    getCarnetById(id: string): Promise<Carnet>;
    updateCarnet(carnetId: string, updateData: any): Promise<Carnet>;
    deleteCarnet(carnetId: string, userId: string): Promise<void>;
    unlockCarnet(userId: string, carnetId: string): Promise<{
        message: string;
        coins: number;
    }>;
    unlockPlace(userId: string, placeId: string): Promise<{
        message: string;
    }>;
    getAllCarnetsExceptUser(userId: string): Promise<Carnet[]>;
    getOwnerByPlace(placeId: string): Promise<string | null>;
    getAllPlaces(): Promise<any[]>;
    getPlaceById(placeId: string): Promise<any>;
    updatePlace(carnetId: string, placeId: string, updateData: any): Promise<any>;
    findCarnetIdByPlaceId(placeId: string): Promise<string | null>;
    deletePlace(carnetId: string, placeId: string): Promise<Carnet>;
    getPlacesByCategory(category: string): Promise<Place[]>;
    getPlacesByCategories(categories: string[]): Promise<Place[]>;
    getTotalRatingForTraveler(userId: string): Promise<number>;
    updateGlobalRating(carnetId: string): Promise<void>;
}
