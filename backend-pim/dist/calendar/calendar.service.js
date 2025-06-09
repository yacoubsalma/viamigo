"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("../event/event.service");
const users_service_1 = require("../users/users.service");
const notification_service_1 = require("../notification/notification.service");
const schedule_1 = require("@nestjs/schedule");
const dayjs = require('dayjs');
require('dayjs/locale/fr');
dayjs.locale('fr');
function formatDate(date) {
    return dayjs(date).format('dddd D MMMM YYYY, HH:mm');
}
let CalendarService = class CalendarService {
    constructor(eventService, userService, notificationService) {
        this.eventService = eventService;
        this.userService = userService;
        this.notificationService = notificationService;
    }
    async handleRecommendation() {
        const users = await this.userService.findAllWithAvailability();
        for (const user of users) {
            for (const slot of user.availability) {
                const startDate = new Date(slot.start);
                const endDate = new Date(slot.end);
                const events = await this.eventService.findEventsBetween(startDate, endDate);
                if (events.length) {
                    const message = `🧠 Tu es libre entre ${startDate} et ${endDate} ? Voici un événement pour toi : ${events[0].title}`;
                    await this.notificationService.sendSimple(user._id, message);
                }
            }
        }
    }
};
exports.CalendarService = CalendarService;
__decorate([
    (0, schedule_1.Cron)('0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CalendarService.prototype, "handleRecommendation", null);
exports.CalendarService = CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_service_1.EventService,
        users_service_1.UsersService,
        notification_service_1.NotificationService])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map