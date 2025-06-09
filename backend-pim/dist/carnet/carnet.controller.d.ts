import { CarnetService } from './carnet.service';
import { Carnet, Place } from './entities/carnet.entity';
export declare class CarnetController {
    private readonly carnetService;
    constructor(carnetService: CarnetService);
    createCarnet(data: any): Promise<Carnet>;
    getUserCarnet(userId: string): Promise<{}>;
    createCarnetForUser(userId: string, title: string): Promise<Carnet>;
    addPlaceToUserCarnet(userId: string, placeData: any): Promise<Carnet>;
    addPlace(carnetId: string, placeData: any): Promise<Carnet>;
    getAllCarnets(): Promise<Carnet[]>;
    getCarnetById(id: string): Promise<Carnet>;
    updateCarnet(carnetId: string, updateData: any): Promise<Carnet>;
    deleteCarnet(carnetId: string, userId: string): Promise<{
        message: string;
    }>;
    unlockCarnet(userId: string, carnetId: string): Promise<{
        message: string;
        coins: number;
    }>;
    unlockPlace(userId: string, placeId: string): Promise<{
        message: string;
    }>;
    getAllCarnetsExceptUser(userId: string): Promise<Carnet[]>;
    getOwnerByPlace(placeId: string): Promise<string>;
    getAllPlaces(): Promise<any[]>;
    getPlaceById(placeId: string): Promise<any>;
    updatePlace(carnetId: string, placeId: string, updateData: any): Promise<any>;
    findCarnetIdByPlaceId(placeId: string): Promise<string | null>;
    deletePlace(carnetId: string, placeId: string): Promise<Carnet>;
    getPlacesByCategory(category: string): Promise<Place[]>;
    getPlacesByCategories(categories: string[]): Promise<Place[]>;
    getTotalRating(userId: string): Promise<{
        averageRating: number;
    }>;
}
