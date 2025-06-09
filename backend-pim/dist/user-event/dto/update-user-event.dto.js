"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserEventDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_event_dto_1 = require("./create-user-event.dto");
class UpdateUserEventDto extends (0, mapped_types_1.PartialType)(create_user_event_dto_1.CreateUserEventDto) {
}
exports.UpdateUserEventDto = UpdateUserEventDto;
//# sourceMappingURL=update-user-event.dto.js.map