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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarnetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const carnet_entity_1 = require("./entities/carnet.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CarnetService = class CarnetService {
    constructor(carnetModel, userModel) {
        this.carnetModel = carnetModel;
        this.userModel = userModel;
    }
    async addPlace(carnetId, placeData) {
        const carnet = await this.carnetModel.findById(carnetId);
        if (!carnet) {
            throw new common_1.NotFoundException('Carnet not found');
        }
        console.log(`Carnet found: ${carnet.title}`);
        console.log(`Place Data Received:`, placeData);
        carnet.places.push(placeData);
        const creatorObjectId = carnet.owner;
        const user = await this.userModel.findById(creatorObjectId);
        if (user) {
            user.coins = (user.coins || 0) + 5;
            await user.save();
        }
        else {
            throw new Error('Creator not found');
        }
        return await carnet.save();
    }
    async createCarnet(data) {
        const newCarnet = new this.carnetModel(data);
        return newCarnet.save();
    }
    async getUserCarnet(userId) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (!user.carnetId) {
            console.log(`User ${userId} does not have a carnet`);
            return { hasCarnet: false };
        }
        const carnet = await this.carnetModel.findById(user.carnetId);
        return { hasCarnet: true, carnet };
    }
    async createCarnetForUser(userId, title) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        console.log(`User found: ${user.email}, CarnetId: ${user.carnetId}`);
        if (user.carnetId) {
            console.log("User already has a carnet, creation aborted");
            throw new common_1.BadRequestException('User already has a carnet');
        }
        console.log("Creating a new carnet...");
        const newCarnet = new this.carnetModel({ title, owner: userId, places: [] });
        await newCarnet.save();
        const creatorObjectId = user;
        if (user) {
            user.coins = (user.coins || 0) + 10;
            await user.save();
        }
        else {
            throw new Error('Creator not found');
        }
        user.carnetId = newCarnet.id;
        await user.save();
        console.log(`Carnet created successfully for user ${userId}`);
        return newCarnet;
    }
    async addPlaceToUserCarnet(userId, placeData) {
        const user = await this.userModel.findById(userId);
        if (!user || !user.carnetId)
            throw new common_1.NotFoundException('User or carnet not found');
        const carnet = await this.carnetModel.findById(user.carnetId);
        carnet.places.push(placeData);
        return await carnet.save();
    }
    async getAllCarnets() {
        return this.carnetModel.find().populate('owner').exec();
    }
    async getCarnetByUserId(userId) {
        return this.carnetModel.findOne({ owner: userId }).exec();
    }
    async getCarnetById(id) {
        const carnet = await this.carnetModel.findById(id);
        if (!carnet)
            throw new common_1.NotFoundException('Carnet not found');
        return carnet;
    }
    async updateCarnet(carnetId, updateData) {
        const carnet = await this.carnetModel.findByIdAndUpdate(carnetId, updateData, { new: true }).exec();
        if (!carnet) {
            throw new common_1.NotFoundException('Carnet not found');
        }
        return carnet;
    }
    async deleteCarnet(carnetId, userId) {
        const carnet = await this.carnetModel.findByIdAndDelete(carnetId);
        if (!carnet) {
            throw new common_1.NotFoundException('Carnet introuvable');
        }
        await this.userModel.findByIdAndUpdate(userId, {
            $unset: { carnetId: '' },
        });
    }
    async unlockCarnet(userId, carnetId) {
        const user = await this.userModel.findById(userId);
        const carnet = await this.carnetModel.findById(carnetId);
        if (!user || !carnet) {
            throw new common_1.NotFoundException('Utilisateur ou carnet introuvable');
        }
        if (user.unlockedCarnets.includes(carnetId)) {
            throw new common_1.BadRequestException('Carnet déjà débloqué');
        }
        if (user.coins < 5) {
            throw new common_1.BadRequestException('Fonds insuffisants pour débloquer ce carnet');
        }
        user.coins -= 5;
        user.unlockedCarnets.push(carnetId);
        await user.save();
        return { message: 'Carnet débloqué avec succès', coins: user.coins };
    }
    async unlockPlace(userId, placeId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const placeExists = await this.carnetModel.findOne({ 'places._id': placeId });
        if (!placeExists) {
            throw new common_1.NotFoundException('Place not found');
        }
        if (!user.unlockedPlaces.includes(placeId)) {
            user.unlockedPlaces.push(placeId);
            await user.save();
        }
        return { message: 'Place unlocked successfully' };
    }
    async getAllCarnetsExceptUser(userId) {
        return this.carnetModel.find({ owner: { $ne: userId } }).exec();
    }
    async getOwnerByPlace(placeId) {
        const placeObjectId = new mongoose_2.Types.ObjectId(placeId);
        const carnet = await this.carnetModel.findOne({ "places._id": placeObjectId }).exec();
        if (carnet) {
            return carnet.owner.toString();
        }
        return null;
    }
    async getAllPlaces() {
        try {
            const carnets = await this.carnetModel.find({}, 'places').exec();
            if (!carnets || carnets.length === 0) {
                throw new common_1.NotFoundException('No carnets found');
            }
            const allPlaces = carnets.flatMap(carnet => carnet.places);
            return allPlaces;
        }
        catch (error) {
            console.error('Error retrieving places:', error);
            throw new common_1.InternalServerErrorException('Error retrieving places');
        }
    }
    async getPlaceById(placeId) {
        const carnet = await this.carnetModel.findOne({ 'places._id': placeId }).exec();
        if (!carnet) {
            throw new common_1.NotFoundException('Place not found');
        }
        const place = carnet.places.find(p => p._id.toString() === placeId);
        if (!place) {
            throw new common_1.NotFoundException('Place not found');
        }
        return place;
    }
    async updatePlace(carnetId, placeId, updateData) {
        const carnet = await this.carnetModel.findById(carnetId);
        if (!carnet)
            throw new common_1.NotFoundException('Carnet not found');
        const placeIndex = carnet.places.findIndex(p => p._id.toString() === placeId);
        if (placeIndex === -1)
            throw new common_1.NotFoundException('Place not found');
        Object.assign(carnet.places[placeIndex], updateData);
        await carnet.save();
        return carnet.places[placeIndex];
    }
    async findCarnetIdByPlaceId(placeId) {
        const placeObjectId = new mongoose_2.Types.ObjectId(placeId);
        const carnet = await this.carnetModel.findOne({ "places._id": placeObjectId }).exec();
        if (carnet) {
            return carnet.id;
        }
        return null;
    }
    async deletePlace(carnetId, placeId) {
        const carnet = await this.carnetModel.findById(carnetId);
        if (!carnet) {
            throw new common_1.NotFoundException('Carnet not found');
        }
        const placeIndex = carnet.places.findIndex((p) => p._id.toString() === placeId);
        if (placeIndex === -1) {
            throw new common_1.NotFoundException('Place not found');
        }
        carnet.places.splice(placeIndex, 1);
        await carnet.save();
        return carnet;
    }
    async getPlacesByCategory(category) {
        const carnet = await this.carnetModel.findOne({
            'places.categories': category,
        }).exec();
        if (!carnet) {
            return [];
        }
        return carnet.places.filter(place => place.categories.includes(category));
    }
    async getPlacesByCategories(categories) {
        const carnet = await this.carnetModel.findOne({
            'places.categories': { $in: categories },
        }).exec();
        if (!carnet) {
            return [];
        }
        return carnet.places.filter(place => place.categories.some(category => categories.includes(category)));
    }
    async getTotalRatingForTraveler(userId) {
        const carnet = await this.carnetModel.findOne({ owner: userId }).exec();
        if (!carnet || carnet.places.length === 0) {
            return 0;
        }
        const total = carnet.places.reduce((sum, place) => sum + (place.averageRating || 0), 0);
        const average = total / carnet.places.length;
        return parseFloat(average.toFixed(2));
    }
    async updateGlobalRating(carnetId) {
        const carnet = await this.carnetModel.findById(carnetId).populate('places').exec();
        if (!carnet) {
            throw new Error('Carnet not found');
        }
        const totalRatings = carnet.places.reduce((sum, place) => sum + place.averageRating, 0);
        const globalAverageRating = carnet.places.length > 0 ? totalRatings / carnet.places.length : 0;
        carnet.globalAverageRating = globalAverageRating;
        await carnet.save();
    }
};
exports.CarnetService = CarnetService;
exports.CarnetService = CarnetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(carnet_entity_1.Carnet.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CarnetService);
//# sourceMappingURL=carnet.service.js.map