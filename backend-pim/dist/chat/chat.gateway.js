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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("../message/message.service");
let ChatGateway = class ChatGateway {
    constructor(messageService) {
        this.messageService = messageService;
    }
    handleConnection(client) {
        console.log(`✅ [BACKEND] Client connecté : ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`❌ [BACKEND] Client déconnecté : ${client.id}`);
    }
    async handleMessage(client, payload) {
        console.log("📥 [BACKEND] Message reçu côté serveur :", payload);
        if (!payload) {
            console.log("⚠️ [BACKEND] Payload est undefined !");
            return;
        }
        const { conversationId, senderId, content, eventId, type } = payload?.data || payload;
        if (!conversationId || !senderId || !content) {
            console.log("⚠️ [BACKEND] Données manquantes ou invalides :", payload);
            return;
        }
        try {
            console.log("📤 [BACKEND] Message diffusé à la room :", conversationId);
        }
        catch (error) {
            console.log("❌ [BACKEND] Erreur lors de l'enregistrement du message :", error.message);
        }
    }
    async handleJoinRoom(client, conversationId) {
        client.join(conversationId);
        console.log(`🚪 [BACKEND] Client ${client.id} a rejoint la room ${conversationId}`);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinRoom", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map