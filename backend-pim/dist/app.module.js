"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const carnet_module_1 = require("./carnet/carnet.module");
const follow_module_1 = require("./follow/follow.module");
const preferences_module_1 = require("./preferences/preferences.module");
const review_module_1 = require("./review/review.module");
const serve_static_1 = require("@nestjs/serve-static");
const upload_module_1 = require("./upload/upload.module");
const message_module_1 = require("./message/message.module");
const conversation_module_1 = require("./conversation/conversation.module");
const event_module_1 = require("./event/event.module");
const chat_gateway_1 = require("./chat/chat.gateway");
const chat_module_1 = require("./chat/chat.module");
const ai_module_1 = require("./ai/ai.module");
const analyse_ia_module_1 = require("./analyse-ia/analyse-ia.module");
const user_event_module_1 = require("./user-event/user-event.module");
const matching_module_1 = require("./matching/matching.module");
const agora_module_1 = require("./agora/agora.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'ribd1920@gmail.com',
                        pass: 'otpd ybir gpwb avzp',
                    },
                },
                defaults: {
                    from: '"PIM " <noreply@example.com>',
                },
                template: {
                    dir: (0, path_1.join)(__dirname, '..', 'templates'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nestjs_app'),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            carnet_module_1.CarnetModule,
            follow_module_1.FollowModule,
            preferences_module_1.PreferencesModule,
            review_module_1.ReviewModule,
            upload_module_1.UploadModule,
            message_module_1.MessageModule,
            conversation_module_1.ConversationModule,
            event_module_1.EventModule,
            chat_module_1.ChatModule,
            ai_module_1.AiModule,
            analyse_ia_module_1.AnalyseIaModule,
            user_event_module_1.UserEventModule,
            matching_module_1.MatchingModule,
            agora_module_1.AgoraModule,
        ], controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map