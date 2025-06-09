"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFreeTimeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_free_time_dto_1 = require("./create-free-time.dto");
class UpdateFreeTimeDto extends (0, mapped_types_1.PartialType)(create_free_time_dto_1.CreateFreeTimeDto) {
}
exports.UpdateFreeTimeDto = UpdateFreeTimeDto;
//# sourceMappingURL=update-free-time.dto.js.map