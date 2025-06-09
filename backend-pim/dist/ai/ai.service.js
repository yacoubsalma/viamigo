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
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
let AIService = class AIService {
    constructor(userModel, carnetModel, preferenceModel, configService) {
        this.userModel = userModel;
        this.carnetModel = carnetModel;
        this.preferenceModel = preferenceModel;
        this.configService = configService;
        this.apiKey = "sk-Xh3kl2eRQ4IiRKVFNpZWm3OyX4mmvxARpupdoErE0Xfklfwb";
        if (!this.apiKey) {
            throw new Error('La clé API ChatAnywhere est manquante !');
        }
    }
    async getBehaviorBasedRecommendations(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user)
            throw new Error('Utilisateur non trouvé');
        const searchTerms = user.searchHistory || [];
        const unlockedPlaceIds = user.unlockedPlaces || [];
        const carnets = await this.carnetModel.find({ "places._id": { $in: unlockedPlaceIds } }).exec();
        const unlockedPlaces = [];
        for (const carnet of carnets) {
            carnet.places.forEach(place => {
                if (unlockedPlaceIds.includes(place._id.toString())) {
                    unlockedPlaces.push(place);
                }
            });
        }
        if (searchTerms.length === 0 && unlockedPlaces.length === 0) {
            return ['Aucune donnée comportementale pour générer des recommandations.'];
        }
        const prompt = `
    Tu es une IA spécialisée dans la personnalisation de contenu touristique.
    
    Voici l’historique des recherches du user : ${searchTerms.join(', ')}
    
    Voici les lieux qu’il a déjà débloqués :
    ${unlockedPlaces.map(p => `- ${p.name} (${p.description})`).join('\n')}
    
    Sur cette base, recommande-lui des lieux à découvrir qui pourraient lui plaire.
    Utilise un ton amical et dynamique.
    `;
        const response = await axios_1.default.post('https://api.chatanywhere.tech/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const recommendations = response.data.choices[0].message?.content.split('\n').filter(Boolean) || [];
        return recommendations;
    }
    async getBehaviorBasedRecommendationsv3(userId) {
        console.log("===== 📥 Début de getBehaviorBasedRecommendationsv3 =====");
        console.log("🔍 User ID reçu :", userId);
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            console.log("❌ Utilisateur introuvable.");
            throw new Error('Utilisateur non trouvé');
        }
        console.log("✅ Utilisateur trouvé :", user.name);
        const searchTerms = user.searchHistory || [];
        const unlockedPlaceIds = user.unlockedPlaces.map(id => id.toString()) || [];
        console.log("🔎 Historique de recherche :", searchTerms);
        console.log("🔓 Lieux débloqués :", unlockedPlaceIds);
        const carnets = await this.carnetModel.find().exec();
        console.log(`📘 Carnets récupérés (${carnets.length})`);
        const allPlaces = carnets.flatMap(c => c.places);
        console.log(`📍 Total des lieux trouvés : ${allPlaces.length}`);
        const relevantPlaces = allPlaces.filter(place => {
            const matchesSearch = place.categories?.some(cat => searchTerms.includes(cat.toLowerCase()));
            const isUnlocked = unlockedPlaceIds.includes(place._id.toString());
            return matchesSearch || isUnlocked;
        });
        console.log(`✅ Lieux pertinents trouvés : ${relevantPlaces.length}`);
        const unlocked = relevantPlaces.filter(p => unlockedPlaceIds.includes(p._id.toString()));
        const locked = relevantPlaces.filter(p => !unlockedPlaceIds.includes(p._id.toString()));
        console.log(`🔓 Lieux débloqués pertinents : ${unlocked.length}`);
        console.log(`🔒 Lieux à débloquer pertinents : ${locked.length}`);
        const prompt = `
    Tu es une IA qui recommande des lieux à visiter.
    
    Voici ce que le user a recherché : ${searchTerms.join(', ') || 'aucune recherche'}
    
    Voici les lieux déjà débloqués :
    ${unlocked.map(p => `- ${p.name} (${p.description})`).join('\n')}
    
    Voici d'autres lieux qui pourraient l'intéresser :
    ${locked.map(p => `- ${p.name} (${p.description})`).join('\n')}
    
    Fais une liste de recommandations personnalisées pour des lieux à découvrir.
    Utilise un ton positif et adapté au tourisme.
      `;
        console.log("🧠 Prompt envoyé à l'IA :", prompt);
        const response = await axios_1.default.post('https://api.chatanywhere.tech/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 500,
        }, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("🤖 Réponse brute de l'IA :", response.data);
        const recommendations = response.data.choices[0].message?.content
            .split('\n')
            .filter(line => line.trim()) || [];
        const lockedPlaces = locked.map(place => ({
            id: place._id,
            name: place.name,
            description: place.description,
            categories: place.categories,
            unlockCost: place.unlockCost
        }));
        console.log("✅ Recommandations générées :", recommendations);
        console.log("✅ Lieux verrouillés formatés :", lockedPlaces);
        console.log("===== ✅ Fin de getBehaviorBasedRecommendationsv3 =====");
        return {
            recommendations,
            lockedPlaces
        };
    }
    async getFilteredPlacesByUserSearch(userId) {
        console.log("🚀 Début getFilteredPlacesByUserSearch");
        const user = await this.userModel.findById(userId).exec();
        if (!user)
            throw new Error("Utilisateur non trouvé");
        const searchTerms = user.searchHistory || [];
        const unlockedPlaceIds = user.unlockedPlaces.map(id => id.toString());
        console.log("🔎 Recherches :", searchTerms);
        console.log("🔓 Lieux débloqués :", unlockedPlaceIds);
        const carnets = await this.carnetModel.find().exec();
        const allPlaces = carnets.flatMap(c => c.places);
        const matchingPlaces = allPlaces.filter(place => place.categories?.some(cat => searchTerms.includes(cat.toLowerCase())));
        console.log("✅ Places correspondantes aux recherches :", matchingPlaces.length);
        const accessiblePlaces = [];
        const lockedPlaces = [];
        matchingPlaces.forEach(place => {
            const isUnlocked = unlockedPlaceIds.includes(place._id.toString());
            const baseInfo = {
                id: place._id,
                name: place.name,
                description: place.description,
                categories: place.categories,
            };
            if (isUnlocked) {
                accessiblePlaces.push(baseInfo);
            }
            else {
                lockedPlaces.push({
                    ...baseInfo,
                    unlockCost: place.unlockCost
                });
            }
        });
        console.log("🔓 Accessible :", accessiblePlaces.length);
        console.log("🔒 Locked :", lockedPlaces.length);
        return {
            accessiblePlaces,
            lockedPlaces
        };
    }
    async getFilteredPlacesByUserSearchv2(userId) {
        console.log("===== 🚀 Début de getFilteredPlacesByUserSearch =====");
        console.log("👤 User ID reçu :", userId);
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            console.log("❌ Utilisateur non trouvé !");
            throw new Error("Utilisateur non trouvé");
        }
        console.log("✅ Utilisateur trouvé :", user.name);
        const unlockedPlaceIds = user.unlockedPlaces.map(id => id.toString());
        const searchTerms = user.searchHistory || [];
        console.log("🔎 searchHistory :", searchTerms);
        console.log("🔓 Places débloquées :", unlockedPlaceIds);
        const preference = await this.preferenceModel.findOne({ user: userId }).exec();
        let preferenceTerms = [];
        if (preference) {
            const favActivities = preference.favoriteActivities || [];
            const eventPrefs = (preference.eventPreferences || []).map(e => {
                return typeof e === 'string' ? e : e.name || e.title || JSON.stringify(e);
            });
            preferenceTerms = [...favActivities, ...eventPrefs];
            console.log("💡 Préférences trouvées :", preferenceTerms);
        }
        else {
            console.log("⚠️ Aucune préférence enregistrée pour ce user.");
        }
        const keywords = [...searchTerms, ...preferenceTerms].map(k => k.toLowerCase());
        console.log("🧠 Mots-clés utilisés pour le matching :", keywords);
        const carnets = await this.carnetModel.find().exec();
        console.log(`📘 Nombre de carnets récupérés : ${carnets.length}`);
        const allPlaces = carnets.flatMap(c => c.places);
        console.log(`📍 Nombre total de places trouvées : ${allPlaces.length}`);
        const matchingPlaces = allPlaces.filter(place => place.categories?.some(cat => keywords.includes(cat.toLowerCase())));
        console.log(`🎯 Nombre de places correspondant aux mots-clés : ${matchingPlaces.length}`);
        const accessiblePlaces = [];
        const lockedPlaces = [];
        matchingPlaces.forEach(place => {
            const isUnlocked = unlockedPlaceIds.includes(place._id.toString());
            const baseInfo = {
                id: place._id,
                name: place.name,
                description: place.description,
                categories: place.categories,
            };
            if (isUnlocked) {
                accessiblePlaces.push(baseInfo);
            }
            else {
                lockedPlaces.push({ ...baseInfo, unlockCost: place.unlockCost });
            }
        });
        console.log(`✅ Places accessibles : ${accessiblePlaces.length}`);
        console.log(`🔒 Places verrouillées : ${lockedPlaces.length}`);
        console.log("===== ✅ Fin de getFilteredPlacesByUserSearch =====");
        return {
            accessiblePlaces,
            lockedPlaces
        };
    }
    async generateImage(prompt) {
        try {
            const response = await axios_1.default.post('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', { inputs: prompt }, {
                headers: {
                    Authorization: `Bearer `,
                    Accept: 'application/json',
                },
                responseType: 'arraybuffer',
            });
            const imageBuffer = Buffer.from(response.data, 'binary');
            return imageBuffer.toString('base64');
        }
        catch (error) {
            const errorMsg = error.response?.data
                ? Buffer.from(error.response.data).toString('utf-8')
                : error.message;
            console.error('❌ Erreur HuggingFace:', errorMsg);
            throw new Error('Erreur lors de la génération de l’image');
        }
    }
    async generateImageWithFlux(eventTitle, startDate, endDate, location, description) {
        const formData = new URLSearchParams();
        const prompt = `Créer une affiche verticale pour un événement intitulé "${eventTitle}".
                        Description : ${description}
                        L'événement aura lieu à ${location}, du ${startDate} au ${endDate}.
                        Style : ambiance festive, couleurs vives, design graphique moderne et attrayant.`;
        formData.append('prompt', prompt);
        formData.append('width', '1024');
        formData.append('height', '1024');
        formData.append('seed', '918440');
        formData.append('model', 'flux');
        try {
            const response = await fetch('https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/fluximagegenerate/generateimage.php', {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'x-rapidapi-host': 'ai-text-to-image-generator-flux-free-api.p.rapidapi.com',
                    'x-rapidapi-key': '49d17ddcb9msh2a1c963651246e7p1224c6jsn6941dadf0f2b',
                },
                body: formData.toString(),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new common_1.HttpException(`Erreur API Flux: ${errorText}`, response.status);
            }
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return buffer.toString('base64');
        }
        catch (error) {
            console.error('Erreur avec l’API Flux:', error);
            throw new common_1.HttpException('Erreur lors de la génération de l’image', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Carnet')),
    __param(2, (0, mongoose_1.InjectModel)('Preference')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], AIService);
//# sourceMappingURL=ai.service.js.map