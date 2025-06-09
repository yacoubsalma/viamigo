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
exports.MatchingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const child_process_1 = require("child_process");
const path = require("path");
let MatchingService = class MatchingService {
    constructor(userModel, preferenceModel) {
        this.userModel = userModel;
        this.preferenceModel = preferenceModel;
    }
    async matchUserWithDatabase(userId) {
        const user = await this.userModel.findById(userId).exec();
        const preference = await this.preferenceModel.findOne({ user: userId }).exec();
        if (!user)
            throw new Error('User not found');
        console.log('🧠 tags:', user.tags);
        console.log('🧠 searchHistory:', user.searchHistory);
        console.log('🧠 preference:', preference);
        const userProfile = this.buildUserProfile(user, preference);
        const otherUsers = await this.userModel.find({ _id: { $ne: userId } }).exec();
        const candidates = await Promise.all(otherUsers.map(async (other) => {
            const pref = await this.preferenceModel.findOne({ user: other._id }).exec();
            const profile = this.buildUserProfile(other, pref);
            console.log(`💬 Profil de ${other.name}:`, profile);
            return {
                id: other._id.toString(),
                name: other.name,
                profileImage: other.profileImage,
                tags: profile,
            };
        }));
        const result = await this.matchUsers(userProfile, candidates);
        let enrichedResult = result.map(match => {
            const original = candidates.find(c => c.id === match.id);
            return {
                ...match,
                profileImage: original?.profileImage || null,
            };
        });
        let filteredResult = enrichedResult.filter(match => match.score > 0.5);
        if (filteredResult.length === 0) {
            filteredResult = result
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);
        }
        return filteredResult;
    }
    async matchUser(userId) {
        const user = await this.userModel.findById(userId).exec();
        const preference = await this.preferenceModel.findOne({ user: userId }).exec();
        if (!user)
            throw new Error('User not found');
        const profileText = this.buildUserProfile(user, preference);
        console.log('Profil complet pour matching:', profileText);
        return { profile: profileText };
    }
    buildUserProfile(user, preference) {
        const tags = user.tags || [];
        const activities = preference?.favoriteActivities || [];
        const events = preference?.eventPreferences || [];
        const time = preference?.preferredEventTime || '';
        const social = preference?.socialPreference || '';
        const all = [
            ...tags,
            ...activities,
            ...events,
            time,
            social,
        ];
        const profile = [...new Set(all.map(w => w?.toLowerCase().trim()))]
            .filter(Boolean)
            .join(' ');
        console.log(`🧠 Profil généré pour ${user.name || user._id}:`, profile);
        return profile;
    }
    async matchUsers(userProfile, candidates) {
        return new Promise((resolve, reject) => {
            const pythonPath = 'python';
            const scriptPath = path.join(__dirname, '../../src/script/match_users.py');
            const pythonProcess = (0, child_process_1.spawn)(pythonPath, [scriptPath]);
            const input = JSON.stringify({ user: userProfile, candidates });
            let result = '';
            let error = '';
            pythonProcess.stdin.write(input);
            pythonProcess.stdin.end();
            pythonProcess.stdout.on('data', (data) => {
                result += data.toString();
            });
            pythonProcess.stderr.on('data', (data) => {
                error += data.toString();
            });
            pythonProcess.on('close', (code) => {
                if (code !== 0 || error) {
                    reject(new Error(error || `Python exited with code ${code}`));
                }
                else {
                    try {
                        resolve(JSON.parse(result));
                    }
                    catch (e) {
                        reject(e);
                    }
                }
            });
        });
    }
};
exports.MatchingService = MatchingService;
exports.MatchingService = MatchingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Preference')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MatchingService);
//# sourceMappingURL=matching.service.js.map