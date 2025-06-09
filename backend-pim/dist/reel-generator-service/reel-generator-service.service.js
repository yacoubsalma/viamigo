"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
let ReelGeneratorService = class ReelGeneratorService {
    async generateVideo(eventId) {
        const inputPath = path.join(__dirname, '../../uploads/reels');
        const outputPath = path.join(__dirname, `../../public/reels/${eventId}.mp4`);
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        }
        return new Promise((resolve, reject) => {
            const command = `ffmpeg -framerate 1 -pattern_type glob -i '${inputPath}/*.jpg' -c:v libx264 -r 30 -pix_fmt yuv420p ${outputPath}`;
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('Erreur ffmpeg:', stderr);
                    reject('Erreur génération vidéo');
                }
                else {
                    console.log('Vidéo générée :', outputPath);
                    resolve(outputPath);
                }
            });
        });
    }
    async addMusicToReel(videoPath, musicPath, finalPath) {
        return new Promise((resolve, reject) => {
            const command = `ffmpeg -i ${videoPath} -i ${musicPath} -shortest -c:v copy -c:a aac ${finalPath}`;
            (0, child_process_1.exec)(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('Erreur ffmpeg (musique):', stderr);
                    reject('Erreur ajout musique');
                }
                else {
                    resolve(finalPath);
                }
            });
        });
    }
};
exports.ReelGeneratorService = ReelGeneratorService;
exports.ReelGeneratorService = ReelGeneratorService = __decorate([
    (0, common_1.Injectable)()
], ReelGeneratorService);
//# sourceMappingURL=reel-generator-service.service.js.map