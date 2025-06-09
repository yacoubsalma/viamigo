"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventSchema = exports.UserEvent = void 0;
class UserEvent {
}
exports.UserEvent = UserEvent;
const mongoose_1 = require("mongoose");
exports.UserEventSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
});
//# sourceMappingURL=user-event.entity.js.map