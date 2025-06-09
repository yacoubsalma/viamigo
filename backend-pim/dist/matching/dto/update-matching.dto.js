"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMatchingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_matching_dto_1 = require("./create-matching.dto");
class UpdateMatchingDto extends (0, mapped_types_1.PartialType)(create_matching_dto_1.CreateMatchingDto) {
}
exports.UpdateMatchingDto = UpdateMatchingDto;
//# sourceMappingURL=update-matching.dto.js.map