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
exports.FreeTimeController = void 0;
const common_1 = require("@nestjs/common");
const free_times_service_1 = require("./free-times.service");
let FreeTimeController = class FreeTimeController {
    constructor(freeTimeService) {
        this.freeTimeService = freeTimeService;
    }
    async addFreeTime(body) {
        const { userId, freeSlots } = body;
        console.log(`Received request: userId=${userId}, freeSlots=${JSON.stringify(freeSlots)}`);
        if (!userId || userId.length !== 24) {
            throw new common_1.BadRequestException('Invalid userId format');
        }
        if (!Array.isArray(freeSlots) || freeSlots.length === 0) {
            throw new common_1.BadRequestException('No free slots provided');
        }
        try {
            for (const slot of freeSlots) {
                const { start, end } = slot;
                const parsedStart = new Date(start);
                const parsedEnd = new Date(end);
                if (isNaN(parsedStart.getTime()) || isNaN(parsedEnd.getTime())) {
                    console.error(`Invalid date format received: start=${start}, end=${end}`);
                    throw new common_1.BadRequestException('Invalid date format for start or end');
                }
                await this.freeTimeService.createFreeTime(userId, start, end);
            }
            return { message: 'Free slots successfully saved' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getFreeTime(userId) {
        if (!userId || userId.length !== 24) {
            throw new common_1.BadRequestException('Invalid userId format');
        }
        try {
            return this.freeTimeService.getFreeTimeByUser(userId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.FreeTimeController = FreeTimeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeTimeController.prototype, "addFreeTime", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FreeTimeController.prototype, "getFreeTime", null);
exports.FreeTimeController = FreeTimeController = __decorate([
    (0, common_1.Controller)('free-time'),
    __metadata("design:paramtypes", [free_times_service_1.FreeTimeService])
], FreeTimeController);
//# sourceMappingURL=free-times.controller.js.map