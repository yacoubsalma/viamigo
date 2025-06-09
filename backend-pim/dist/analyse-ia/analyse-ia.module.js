"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyseIaModule = void 0;
const common_1 = require("@nestjs/common");
const analyse_ia_service_1 = require("./analyse-ia.service");
const analyse_ia_controller_1 = require("./analyse-ia.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_activity_entity_ts_1 = require("./entities/user-activity.entity.ts");
const preference_entity_1 = require("../preferences/entities/preference.entity");
const users_module_1 = require("../users/users.module");
let AnalyseIaModule = class AnalyseIaModule {
};
exports.AnalyseIaModule = AnalyseIaModule;
exports.AnalyseIaModule = AnalyseIaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_activity_entity_ts_1.UserActivity.name, schema: user_activity_entity_ts_1.UserActivitySchema },
                { name: preference_entity_1.Preference.name, schema: preference_entity_1.PreferenceSchema },
            ]),
        ],
        controllers: [analyse_ia_controller_1.AnalyseIaController],
        providers: [analyse_ia_service_1.AnalyseIaService],
    })
], AnalyseIaModule);
//# sourceMappingURL=analyse-ia.module.js.map