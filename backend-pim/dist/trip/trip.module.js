"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const trip_controller_1 = require("./trip.controller");
const trip_service_1 = require("./trip.service");
const user_entity_1 = require("../users/entities/user.entity");
const trip_reminder_service_1 = require("./trip_reminder.service");
const trip_entity_1 = require("./entities/trip.entity");
const notification_module_1 = require("../notification/notification.module");
const notification_entity_1 = require("../notification/entities/notification.entity");
const notification_service_1 = require("../notification/notification.service");
let TripModule = class TripModule {
};
exports.TripModule = TripModule;
exports.TripModule = TripModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: trip_entity_1.Trip.name, schema: trip_entity_1.TripSchema },
                { name: notification_entity_1.Notification.name, schema: notification_entity_1.NotificationSchema }
            ]),
            (0, common_1.forwardRef)(() => notification_module_1.NotificationModule)
        ],
        controllers: [trip_controller_1.TripController],
        providers: [trip_service_1.TripService, trip_reminder_service_1.TripReminderService, notification_service_1.NotificationService],
        exports: [trip_service_1.TripService]
    })
], TripModule);
//# sourceMappingURL=trip.module.js.map