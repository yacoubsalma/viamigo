"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const follow_service_1 = require("./follow.service");
const follow_controller_1 = require("./follow.controller");
const follow_entity_1 = require("./entities/follow.entity");
const users_module_1 = require("../users/users.module");
const notification_module_1 = require("../notification/notification.module");
let FollowModule = class FollowModule {
};
exports.FollowModule = FollowModule;
exports.FollowModule = FollowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: follow_entity_1.Follow.name, schema: follow_entity_1.FollowSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => notification_module_1.NotificationModule),
        ],
        controllers: [follow_controller_1.FollowController],
        providers: [follow_service_1.FollowService],
        exports: [follow_service_1.FollowService, mongoose_1.MongooseModule],
    })
], FollowModule);
//# sourceMappingURL=follow.module.js.map