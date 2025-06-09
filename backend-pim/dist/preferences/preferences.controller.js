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
exports.PreferencesController = void 0;
const common_1 = require("@nestjs/common");
const preferences_service_1 = require("./preferences.service");
const create_preference_dto_1 = require("./dto/create-preference.dto");
const update_preference_dto_1 = require("./dto/update-preference.dto");
let PreferencesController = class PreferencesController {
    constructor(preferencesService) {
        this.preferencesService = preferencesService;
    }
    async create(createPreferenceDto) {
        const preference = await this.preferencesService.create(createPreferenceDto);
        console.log('Create preference ' + createPreferenceDto.user);
        this.preferencesService.generateTagsFromPreferences(createPreferenceDto.user);
        return preference;
    }
    async up(createPreferenceDto) {
        return this.preferencesService.generateTagsFromPreferences(createPreferenceDto);
    }
    async getMatchingUsers(userId) {
        const currentPrefs = await this.preferencesService.findByUserId(userId);
        const users = await this.preferencesService.findMatchingUsers(currentPrefs);
        return users;
    }
    findAll() {
        return this.preferencesService.findAll();
    }
    findOne(id) {
        return this.preferencesService.findOne(id);
    }
    findPreferencesByUserId(userId) {
        return this.preferencesService.findByUserId(userId);
    }
    update(id, updatePreferenceDto) {
        return this.preferencesService.update(id, updatePreferenceDto);
    }
    remove(id) {
        return this.preferencesService.remove(id);
    }
};
exports.PreferencesController = PreferencesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_preference_dto_1.CreatePreferenceDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)("/updatePref/:userId"),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "up", null);
__decorate([
    (0, common_1.Get)('matching/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getMatchingUsers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "findPreferencesByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_preference_dto_1.UpdatePreferenceDto]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "remove", null);
exports.PreferencesController = PreferencesController = __decorate([
    (0, common_1.Controller)('preferences'),
    __metadata("design:paramtypes", [preferences_service_1.PreferencesService])
], PreferencesController);
//# sourceMappingURL=preferences.controller.js.map