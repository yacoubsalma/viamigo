"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarnetModule = void 0;
const common_1 = require("@nestjs/common");
const carnet_service_1 = require("./carnet.service");
const carnet_controller_1 = require("./carnet.controller");
const users_module_1 = require("../users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const carnet_entity_1 = require("./entities/carnet.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CarnetModule = class CarnetModule {
};
exports.CarnetModule = CarnetModule;
exports.CarnetModule = CarnetModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => users_module_1.UsersModule),
            mongoose_1.MongooseModule.forFeature([
                { name: carnet_entity_1.Carnet.name, schema: carnet_entity_1.CarnetSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema }
            ])
        ],
        controllers: [carnet_controller_1.CarnetController],
        providers: [carnet_service_1.CarnetService, CarnetModule],
        exports: [carnet_service_1.CarnetService, CarnetModule],
    })
], CarnetModule);
//# sourceMappingURL=carnet.module.js.map