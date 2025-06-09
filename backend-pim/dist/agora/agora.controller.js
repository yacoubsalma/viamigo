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
exports.AgoraController = void 0;
const common_1 = require("@nestjs/common");
const agora_service_1 = require("./agora.service");
let AgoraController = class AgoraController {
    constructor(agoraService) {
        this.agoraService = agoraService;
    }
    getToken(channelName, uid, role) {
        const userRole = role === 'PUBLISHER' ? 'PUBLISHER' : 'SUBSCRIBER';
        return this.agoraService.generateToken(channelName, uid, userRole);
    }
};
exports.AgoraController = AgoraController;
__decorate([
    (0, common_1.Get)('token'),
    __param(0, (0, common_1.Query)('channelName')),
    __param(1, (0, common_1.Query)('uid')),
    __param(2, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", String)
], AgoraController.prototype, "getToken", null);
exports.AgoraController = AgoraController = __decorate([
    (0, common_1.Controller)('agora'),
    __metadata("design:paramtypes", [agora_service_1.AgoraService])
], AgoraController);
//# sourceMappingURL=agora.controller.js.map