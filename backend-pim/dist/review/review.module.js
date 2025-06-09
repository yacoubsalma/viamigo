"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const review_service_1 = require("./review.service");
const review_controller_1 = require("./review.controller");
const review_entity_1 = require("./entities/review.entity");
const carnet_entity_1 = require("../carnet/entities/carnet.entity");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: review_entity_1.Review.name, schema: review_entity_1.ReviewSchema },
                { name: carnet_entity_1.Place.name, schema: carnet_entity_1.CarnetSchema },
                { name: carnet_entity_1.Carnet.name, schema: carnet_entity_1.CarnetSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
            ]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        providers: [review_service_1.ReviewService],
        controllers: [review_controller_1.ReviewController],
        exports: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map