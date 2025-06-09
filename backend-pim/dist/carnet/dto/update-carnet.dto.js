"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarnetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_carnet_dto_1 = require("./create-carnet.dto");
class UpdateCarnetDto extends (0, mapped_types_1.PartialType)(create_carnet_dto_1.CreateCarnetDto) {
}
exports.UpdateCarnetDto = UpdateCarnetDto;
//# sourceMappingURL=update-carnet.dto.js.map