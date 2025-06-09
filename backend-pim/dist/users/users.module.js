"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_entity_1 = require("./entities/user.entity");
const preferences_module_1 = require("../preferences/preferences.module");
const carnet_service_1 = require("../carnet/carnet.service");
const preference_entity_1 = require("../preferences/entities/preference.entity");
const carnet_entity_1 = require("../carnet/entities/carnet.entity");
const preferences_service_1 = require("../preferences/preferences.service");
const event_module_1 = require("../event/event.module");
const event_service_1 = require("../event/event.service");
const chat_module_1 = require("../chat/chat.module");
const chat_service_1 = require("../chat/chat.service");
const conversation_module_1 = require("../conversation/conversation.module");
const conversation_service_1 = require("../conversation/conversation.service");
const follow_module_1 = require("../follow/follow.module");
const follow_service_1 = require("../follow/follow.service");
const free_times_module_1 = require("../free-times/free-times.module");
const free_times_service_1 = require("../free-times/free-times.service");
const message_module_1 = require("../message/message.module");
const notification_module_1 = require("../notification/notification.module");
const notification_service_1 = require("../notification/notification.service");
const reel_module_1 = require("../reel/reel.module");
const reel_service_1 = require("../reel/reel.service");
const review_module_1 = require("../review/review.module");
const trip_module_1 = require("../trip/trip.module");
const user_event_module_1 = require("../user-event/user-event.module");
const message_service_1 = require("../message/message.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: preference_entity_1.Preference.name, schema: preference_entity_1.PreferenceSchema },
                { name: carnet_entity_1.Carnet.name, schema: carnet_entity_1.CarnetSchema },
            ]),
            (0, common_1.forwardRef)(() => event_module_1.EventModule),
            chat_module_1.ChatModule,
            (0, common_1.forwardRef)(() => conversation_module_1.ConversationModule),
            (0, common_1.forwardRef)(() => follow_module_1.FollowModule),
            (0, common_1.forwardRef)(() => free_times_module_1.FreeTimeModule),
            (0, common_1.forwardRef)(() => message_module_1.MessageModule),
            (0, common_1.forwardRef)(() => notification_module_1.NotificationModule),
            (0, common_1.forwardRef)(() => reel_module_1.ReelModule),
            (0, common_1.forwardRef)(() => preferences_module_1.PreferencesModule),
            (0, common_1.forwardRef)(() => review_module_1.ReviewModule),
            (0, common_1.forwardRef)(() => trip_module_1.TripModule),
            (0, common_1.forwardRef)(() => user_event_module_1.UserEventModule),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            carnet_service_1.CarnetService,
            preferences_service_1.PreferencesService,
            event_service_1.EventService,
            chat_service_1.ChatService,
            conversation_service_1.ConversationService,
            follow_service_1.FollowService,
            free_times_service_1.FreeTimeService,
            message_service_1.MessageService,
            notification_service_1.NotificationService,
            reel_service_1.ReelService,
        ],
        exports: [
            users_service_1.UsersService,
            carnet_service_1.CarnetService,
            mongoose_1.MongooseModule,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map