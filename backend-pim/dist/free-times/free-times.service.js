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
exports.FreeTimeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const free_time_entity_1 = require("./entities/free-time.entity");
const mongoose_2 = require("mongoose");
let FreeTimeService = class FreeTimeService {
    constructor(freeTimeModel) {
        this.freeTimeModel = freeTimeModel;
    }
    async createFreeTime(userId, start, end) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new common_1.BadRequestException('Invalid userId format');
        }
        const parsedStart = new Date(start);
        const parsedEnd = new Date(end);
        if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
            console.error(`Invalid date format: start=${start}, end=${end}`);
            throw new common_1.BadRequestException('Invalid date format for start or end');
        }
        console.log(`Creating free time: userId=${userId}, start=${parsedStart}, end=${parsedEnd}`);
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        return this.freeTimeModel.create({ userId: userObjectId, start: parsedStart, end: parsedEnd });
    }
    async getFreeTimeByUser(userId) {
        if (!mongoose_2.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId format');
        }
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        return this.freeTimeModel.find({ userId: userObjectId }).exec();
    }
    async deleteFreeTimesByUser(userId) {
        await this.freeTimeModel.deleteMany({ userId }).exec();
    }
};
exports.FreeTimeService = FreeTimeService;
exports.FreeTimeService = FreeTimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(free_time_entity_1.FreeTime.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FreeTimeService);
//# sourceMappingURL=free-times.service.js.map