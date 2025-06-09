import { Model } from 'mongoose';
import { Preference } from './entities/preference.entity';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { UserDocument } from 'src/users/entities/user.entity';
export declare class PreferencesService {
    private preferenceModel;
    private userModel;
    constructor(preferenceModel: Model<Preference>, userModel: Model<UserDocument>);
    create(createPreferenceDto: CreatePreferenceDto): Promise<import("mongoose").Document<unknown, {}, Preference> & Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findMatchingUsers(currentPrefs: any): Promise<import("mongoose").Types.ObjectId[]>;
    generateTagsFromPreferences(userId: string): Promise<void>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Preference> & Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Preference> & Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findByUserId(userId: string): Promise<import("mongoose").Document<unknown, {}, Preference> & Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePreferenceDto: UpdatePreferenceDto): Promise<import("mongoose").Document<unknown, {}, Preference> & Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    deletePreferencesByUser(userId: string): Promise<void>;
}
