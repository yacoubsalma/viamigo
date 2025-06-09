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
exports.ReelController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const reel_service_1 = require("./reel.service");
let ReelController = class ReelController {
    constructor(reelsService) {
        this.reelsService = reelsService;
    }
    async uploadReel(eventId, userId, isShared, files) {
        console.log('🟢 Reçu:', { eventId, userId, isShared });
        const imageUrls = files.files.map(file => `uploads/reels/${file.filename}`);
        const musicFilename = files.music?.[0]?.filename;
        return this.reelsService.saveReel({
            eventId,
            userId,
            mediaUrls: imageUrls,
            isShared,
            music: musicFilename || null,
        });
    }
    async generateReel(eventId, userId) {
        console.log('Event ID:', eventId);
        console.log('User ID:', userId);
        try {
            const outputPath = await this.reelsService.generateReel(eventId, userId);
            return { message: 'Reel généré', path: outputPath };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getReels(eventId) {
        try {
            console.log('Event ID:', eventId);
            const reels = await this.reelsService.findReelsByEvent(eventId);
            const formattedReels = reels.map(reel => ({
                ...reel.toObject(),
                videoUrl: `reels/${reel.eventId}_${reel.userId}.mp4`,
            }));
            console.log('Formatted Reels:', formattedReels);
            return formattedReels;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addMusic(eventId, musicFileName) {
        try {
            const path = await this.reelsService.addMusicToReel(eventId, musicFileName);
            return { message: 'Musique ajoutée', path };
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadMusic(file) {
        if (!file) {
            throw new common_1.HttpException('Aucun fichier reçu', common_1.HttpStatus.BAD_REQUEST);
        }
        return { message: 'Musique uploadée', filename: file.filename };
    }
};
exports.ReelController = ReelController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'files', maxCount: 10 },
        { name: 'music', maxCount: 1 }
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/reels',
            filename: (req, file, cb) => {
                const filename = (0, uuid_1.v4)() + path.extname(file.originalname);
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)('eventId')),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('isShared')),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], ReelController.prototype, "uploadReel", null);
__decorate([
    (0, common_1.Post)('generate/:eventId/:userId'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReelController.prototype, "generateReel", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReelController.prototype, "getReels", null);
__decorate([
    (0, common_1.Post)('add-music/:eventId'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)('music')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReelController.prototype, "addMusic", null);
__decorate([
    (0, common_1.Post)('upload-music'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './assets/audio',
            filename: (req, file, cb) => {
                const fileName = file.originalname;
                cb(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReelController.prototype, "uploadMusic", null);
exports.ReelController = ReelController = __decorate([
    (0, common_1.Controller)('reels'),
    __metadata("design:paramtypes", [reel_service_1.ReelService])
], ReelController);
//# sourceMappingURL=reel.controller.js.map