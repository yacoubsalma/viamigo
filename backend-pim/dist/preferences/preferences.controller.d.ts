import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
export declare class PreferencesController {
    private readonly preferencesService;
    constructor(preferencesService: PreferencesService);
    create(createPreferenceDto: CreatePreferenceDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/preference.entity").Preference> & import("./entities/preference.entity").Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    up(createPreferenceDto: string): Promise<void>;
    getMatchingUsers(userId: string): Promise<import("mongoose").Types.ObjectId[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./entities/preference.entity").Preference> & import("./entities/preference.entity").Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/preference.entity").Preference> & import("./entities/preference.entity").Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findPreferencesByUserId(userId: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/preference.entity").Preference> & import("./entities/preference.entity").Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePreferenceDto: UpdatePreferenceDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/preference.entity").Preference> & import("./entities/preference.entity").Preference & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
