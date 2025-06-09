"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeTimeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const free_times_service_1 = require("./free-times.service");
const free_times_controller_1 = require("./free-times.controller");
const free_time_entity_1 = require("./entities/free-time.entity");
const users_module_1 = require("../users/users.module");
let FreeTimeModule = class FreeTimeModule {
};
exports.FreeTimeModule = FreeTimeModule;
exports.FreeTimeModule = FreeTimeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: free_time_entity_1.FreeTime.name, schema: free_time_entity_1.FreeTimeSchema }]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [free_times_controller_1.FreeTimeController],
        providers: [free_times_service_1.FreeTimeService],
        exports: [free_times_service_1.FreeTimeService, mongoose_1.MongooseModule],
    })
], FreeTimeModule);
//# sourceMappingURL=free-times.module.js.map