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
var AnalyseIaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyseIaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const preference_entity_1 = require("../preferences/entities/preference.entity");
const axios_1 = require("axios");
const user_activity_entity_ts_1 = require("./entities/user-activity.entity.ts");
const schedule_1 = require("@nestjs/schedule");
const users_service_1 = require("../users/users.service");
let AnalyseIaService = AnalyseIaService_1 = class AnalyseIaService {
    constructor(activityModel, preferenceModel, userModel, usersService) {
        this.activityModel = activityModel;
        this.preferenceModel = preferenceModel;
        this.userModel = userModel;
        this.usersService = usersService;
        this.apiKey = 'sk-Xh3kl2eRQ4IiRKVFNpZWm3OyX4mmvxARpupdoErE0Xfklfwb';
        this.logger = new common_1.Logger(AnalyseIaService_1.name);
    }
    async logActivity(userId, type, value) {
        await this.activityModel.create({ userId, type, value });
    }
    async analyseUser(userId) {
        const activities = await this.activityModel.find({ userId }).exec();
        if (activities.length === 0) {
            console.log(`⚠️ No activities found for user ${userId}. No update on tags.`);
            return [];
        }
        const log = activities
            .map((act) => `- [${act.type}] ${act.value}`)
            .join('\n');
        const prompt = `
      Voici les dernières activités d'un utilisateur :
      ${log}
      
      Déduis à partir de ces actions quelles sont ses préférences principales en 5 mots clés. Ne réponds que par la liste.
    `;
        try {
            const res = await axios_1.default.post('https://api.chatanywhere.tech/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const keywords = res.data.choices[0].message.content
                .split('\n')
                .map((x) => x.trim())
                .filter(Boolean);
            if (!keywords.length) {
                console.log(`⚠️ GPT did not return valid preferences for ${userId}. No update on tags.`);
                return [];
            }
            await this.userModel.updateOne({ _id: userId }, { $set: { tags: keywords } });
            await this.activityModel.deleteMany({ userId });
            return keywords;
        }
        catch (error) {
            console.error('Error analyzing user:', error);
            throw error;
        }
    }
    async analyseAllUsers() {
        this.logger.log("🟡 Démarrage de l'analyse automatique des profils...");
        const users = await this.usersService.getAllUsers();
        for (const user of users) {
            const prefs = await this.analyseUser(user._id.toString());
            this.logger.log(`🟢 Préférences pour ${user.email}: ${prefs.join(', ')}`);
        }
        this.logger.log('✅ Analyse terminée pour tous les utilisateurs.');
    }
    async handleCron() {
        console.log('analyse done');
        await this.analyseAllUsers();
    }
};
exports.AnalyseIaService = AnalyseIaService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyseIaService.prototype, "handleCron", null);
exports.AnalyseIaService = AnalyseIaService = AnalyseIaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_activity_entity_ts_1.UserActivity.name)),
    __param(1, (0, mongoose_1.InjectModel)(preference_entity_1.Preference.name)),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], AnalyseIaService);
//# sourceMappingURL=analyse-ia.service.js.map