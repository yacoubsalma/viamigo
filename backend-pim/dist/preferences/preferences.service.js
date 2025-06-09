"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferencesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const preference_entity_1 = require("./entities/preference.entity");
const user_entity_1 = require("../users/entities/user.entity");
let PreferencesService = class PreferencesService {
    constructor(preferenceModel, userModel) {
        this.preferenceModel = preferenceModel;
        this.userModel = userModel;
    }
    async create(createPreferenceDto) {
        const createdPreference = new this.preferenceModel(createPreferenceDto);
        return createdPreference.save();
    }
    async findMatchingUsers(currentPrefs) {
        const allPrefs = await this.preferenceModel.find({ user: { $ne: currentPrefs.user } }).populate('user');
        return allPrefs
            .filter(p => p.favoriteActivities.some(act => currentPrefs.favoriteActivities.includes(act)) ||
            p.eventPreferences.some(ev => currentPrefs.eventPreferences.includes(ev)) ||
            p.socialPreference === currentPrefs.socialPreference ||
            p.preferredEventTime === currentPrefs.preferredEventTime)
            .map(p => p.user);
    }
    async generateTagsFromPreferences(userId) {
        console.log("generating tags for user " + userId);
        const preferences = await this.preferenceModel.findOne({ user: userId });
        if (!preferences)
            throw new common_1.NotFoundException('User preferences not found');
        const tags = new Set();
        preferences.favoriteActivities.forEach(activity => {
            if (activity.toLowerCase().includes('sport'))
                tags.add('Sport');
            if (activity.toLowerCase().includes('musée') || activity.toLowerCase().includes('culture'))
                tags.add('Culture');
            if (activity.toLowerCase().includes('camping') || activity.toLowerCase().includes('nature'))
                tags.add('Nature');
            if (activity.toLowerCase().includes('shopping'))
                tags.add('Shopping');
        });
        preferences.eventPreferences.forEach(event => {
            if (event.toLowerCase().includes('tech'))
                tags.add('Technologie');
            if (event.toLowerCase().includes('music'))
                tags.add('Musique');
            if (event.toLowerCase().includes('art'))
                tags.add('Art');
        });
        if (preferences.socialPreference === 'Large Gatherings')
            tags.add('Extrovert');
        if (preferences.socialPreference === 'Small Groups')
            tags.add('Introvert');
        if (preferences.preferredEventTime === 'Morning')
            tags.add('Matinal');
        if (preferences.preferredEventTime === 'Afternoon')
            tags.add('Actif en journée');
        if (preferences.preferredEventTime === 'Evening')
            tags.add('Nocturne');
        await this.userModel.findByIdAndUpdate(userId, {
            $set: { tags: Array.from(tags) }
        });
    }
    async findAll() {
        return this.preferenceModel.find().exec();
    }
    async findOne(id) {
        const preference = await this.preferenceModel.findById(id).exec();
        if (!preference) {
            throw new common_1.NotFoundException(`Preference with ID ${id} not found`);
        }
        return preference;
    }
    async findByUserId(userId) {
        const preference = await this.preferenceModel
            .findOne({ user: userId })
            .exec();
        if (!preference) {
            throw new common_1.NotFoundException(`Preference for user with ID ${userId} not found`);
        }
        return preference;
    }
    async update(id, updatePreferenceDto) {
        const updatedPreference = await this.preferenceModel
            .findByIdAndUpdate(id, updatePreferenceDto, { new: true })
            .exec();
        if (!updatedPreference) {
            throw new common_1.NotFoundException(`Preference with ID ${id} not found`);
        }
        return updatedPreference;
    }
    async remove(id) {
        const deletedPreference = await this.preferenceModel
            .findByIdAndDelete(id)
            .exec();
        if (!deletedPreference) {
            throw new common_1.NotFoundException(`Preference with ID ${id} not found`);
        }
        return { message: `Preference with ID ${id} has been deleted` };
    }
    async deletePreferencesByUser(userId) {
        await this.preferenceModel.deleteOne({ user: userId }).exec();
    }
};
exports.PreferencesService = PreferencesService;
exports.PreferencesService = PreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(preference_entity_1.Preference.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PreferencesService);
//# sourceMappingURL=preferences.service.js.map