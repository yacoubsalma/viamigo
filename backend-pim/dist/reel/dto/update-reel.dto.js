"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_reel_dto_1 = require("./create-reel.dto");
class UpdateReelDto extends (0, mapped_types_1.PartialType)(create_reel_dto_1.CreateReelDto) {
}
exports.UpdateReelDto = UpdateReelDto;
//# sourceMappingURL=update-reel.dto.js.map