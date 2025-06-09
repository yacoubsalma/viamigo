"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reel_service_1 = require("./reel.service");
const reel_controller_1 = require("./reel.controller");
const users_module_1 = require("../users/users.module");
const reel_entity_1 = require("./entities/reel.entity");
let ReelModule = class ReelModule {
};
exports.ReelModule = ReelModule;
exports.ReelModule = ReelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: reel_entity_1.ReelMedia.name, schema: reel_entity_1.ReelMediaSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [reel_controller_1.ReelController],
        providers: [reel_service_1.ReelService],
        exports: [reel_service_1.ReelService, mongoose_1.MongooseModule],
    })
], ReelModule);
//# sourceMappingURL=reel.module.js.map