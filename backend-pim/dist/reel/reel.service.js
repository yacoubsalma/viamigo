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
exports.ReelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const reel_entity_1 = require("./entities/reel.entity");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const fs = require("fs");
const path = require("path");
const child_process_1 = require("child_process");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg");
const fluentFfmpeg = require("fluent-ffmpeg");
fluentFfmpeg.setFfmpegPath(ffmpegPath.path);
let ReelService = class ReelService {
    constructor(reelModel) {
        this.reelModel = reelModel;
        ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    }
    async saveReel(data) {
        return await this.reelModel.create(data);
    }
    async findReelsByEvent(eventId) {
        if (!eventId)
            throw new Error('Event ID manquant');
        return this.reelModel.find({ eventId });
    }
    async generateReel(eventId, userId) {
        const reel = await this.reelModel.findOne({ eventId, userId });
        if (!reel || reel.mediaUrls.length === 0) {
            throw new Error('Aucune image trouvée');
        }
        const outputDir = path.join(__dirname, '../../public/reels');
        const outputPath = path.join(outputDir, `${eventId}_${userId}.mp4`);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const concatFile = path.join(__dirname, '../../uploads/reels/concat.txt');
        const fileLines = reel.mediaUrls.map((imgPath) => {
            const absolutePath = path.resolve(__dirname, '../../', imgPath);
            return `file '${absolutePath.replace(/\\/g, '/')}'\nduration 3`;
        });
        const lastImage = path.resolve(__dirname, '../../', reel.mediaUrls[reel.mediaUrls.length - 1]);
        fileLines.push(`file '${lastImage.replace(/\\/g, '/')}'`);
        fs.writeFileSync(concatFile, fileLines.join('\n'));
        const hasMusic = reel.music && fs.existsSync(path.join(__dirname, '../../uploads/reels', reel.music));
        const musicPath = hasMusic ? path.join(__dirname, '../../uploads/reels', reel.music) : null;
        return new Promise((resolve, reject) => {
            let command = fluentFfmpeg()
                .input(concatFile)
                .inputOptions(['-f', 'concat', '-safe', '0'])
                .outputOptions([
                '-vf', 'scale=1280:720',
                '-pix_fmt', 'yuv420p',
                '-r', '30',
            ]);
            if (hasMusic) {
                command = command.input(musicPath).outputOptions(['-shortest']);
            }
            command
                .on('start', cmd => console.log('🎬 FFmpeg CMD:', cmd))
                .on('end', () => {
                console.log('✅ Vidéo générée:', outputPath);
                resolve(`reels/${eventId}_${userId}.mp4`);
            })
                .on('error', err => {
                console.error('❌ FFmpeg error:', err.message);
                reject(new Error('Erreur génération vidéo'));
            })
                .save(outputPath);
        });
    }
    async generateVideo(eventId) {
        const inputDir = path.join(__dirname, '../../uploads/reels', eventId);
        const outputPath = path.join(__dirname, `../../public/reels/${eventId}.mp4`);
        if (!fs.existsSync(inputDir))
            throw new Error("📁 Dossier d'images introuvable");
        return new Promise((resolve, reject) => {
            const command = `ffmpeg -framerate 1 -pattern_type glob -i '${inputDir}/*.jpg' -c:v libx264 -r 30 -pix_fmt yuv420p ${outputPath}`;
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Erreur exec ffmpeg :', stderr);
                    return reject('Erreur génération vidéo');
                }
                console.log('✅ Vidéo générée via glob :', outputPath);
                resolve(`reels/${eventId}.mp4`);
            });
        });
    }
    async addMusicToReel(eventId, musicFilename) {
        const videoPath = path.join(__dirname, `../../public/reels/${eventId}.mp4`);
        const musicPath = path.join(__dirname, `../../assets/audio/${musicFilename}`);
        const finalPath = path.join(__dirname, `../../public/reels/${eventId}_with_music.mp4`);
        if (!fs.existsSync(videoPath))
            throw new Error('🎥 Vidéo non trouvée');
        if (!fs.existsSync(musicPath))
            throw new Error('🎵 Fichier musique non trouvé');
        return new Promise((resolve, reject) => {
            const command = `ffmpeg -i "${videoPath}" -i "${musicPath}" -shortest -c:v copy -c:a aac "${finalPath}"`;
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('❌ Erreur ajout musique :', stderr);
                    return reject('Erreur ajout musique');
                }
                fs.unlinkSync(videoPath);
                fs.renameSync(finalPath, videoPath);
                console.log('✅ Musique ajoutée avec succès');
                resolve(`reels/${eventId}.mp4`);
            });
        });
    }
    async deleteReelsByUser(userId) {
        await this.reelModel.deleteMany({ userId }).exec();
    }
};
exports.ReelService = ReelService;
exports.ReelService = ReelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(reel_entity_1.ReelMedia.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReelService);
//# sourceMappingURL=reel.service.js.map