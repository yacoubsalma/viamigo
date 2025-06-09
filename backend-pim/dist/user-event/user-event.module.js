"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_event_service_1 = require("./user-event.service");
const user_event_controller_1 = require("./user-event.controller");
const user_event_entity_1 = require("./entities/user-event.entity");
let UserEventModule = class UserEventModule {
};
exports.UserEventModule = UserEventModule;
exports.UserEventModule = UserEventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_event_entity_1.UserEvent.name, schema: user_event_entity_1.UserEventSchema }]),
        ],
        controllers: [user_event_controller_1.UserEventController],
        providers: [user_event_service_1.UserEventService],
        exports: [user_event_service_1.UserEventService],
    })
], UserEventModule);
//# sourceMappingURL=user-event.module.js.map