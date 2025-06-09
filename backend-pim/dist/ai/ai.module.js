"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ai_service_1 = require("./ai.service");
const ai_controller_1 = require("./ai.controller");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
const config_1 = require("@nestjs/config");
const carnet_module_1 = require("../carnet/carnet.module");
const carnet_entity_1 = require("../carnet/entities/carnet.entity");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            (0, common_1.forwardRef)(() => carnet_module_1.CarnetModule),
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: carnet_entity_1.Carnet.name, schema: carnet_entity_1.CarnetSchema }
            ])
        ],
        providers: [ai_service_1.AIService],
        controllers: [ai_controller_1.AIController]
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map