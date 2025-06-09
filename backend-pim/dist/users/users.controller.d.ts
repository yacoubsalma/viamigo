import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Preference } from 'src/preferences/entities/preference.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        user: Partial<User>;
        preferences: Partial<Preference>;
    }): Promise<User>;
    addUserPreferences(userId: string, preferences: Partial<Preference>): Promise<Preference>;
    getUserPreferencesById(userId: string): Promise<Preference>;
    updateUserPreferences(userId: string, preferences: Partial<Preference>): Promise<Preference>;
    getAllUsers(): Promise<User[]>;
    findById(id: string): Promise<User>;
    getPublicProfile(userId: string): Promise<any>;
    checkVerification(email: string): Promise<{
        isVerified: boolean;
    }>;
    updateProfile(id: string, updateData: Partial<User>, file: Express.Multer.File): Promise<User>;
    deleteAccount(id: string): Promise<string>;
    unlockPlace(userId: string, placeId: string): Promise<{
        message: string;
        coinsRemaining: number;
        ownerCoins: number;
    }>;
    getUnlockedPlaces(userId: string): Promise<string[]>;
    addPlaceToFavorites(userId: string, placeId: string): Promise<User>;
    getUserFavorites(userId: string): Promise<string[]>;
    removePlaceFromFavorites(userId: string, placeId: string): Promise<User>;
}
