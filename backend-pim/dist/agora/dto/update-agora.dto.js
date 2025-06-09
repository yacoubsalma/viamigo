"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAgoraDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_agora_dto_1 = require("./create-agora.dto");
class UpdateAgoraDto extends (0, mapped_types_1.PartialType)(create_agora_dto_1.CreateAgoraDto) {
}
exports.UpdateAgoraDto = UpdateAgoraDto;
//# sourceMappingURL=update-agora.dto.js.map