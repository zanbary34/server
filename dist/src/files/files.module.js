"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const files_service_1 = require("./files.service");
const files_controller_1 = require("./files.controller");
const file_entity_1 = require("./entities/file.entity");
const customer_entity_1 = require("./entities/customer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const cache_manager_1 = require("@nestjs/cache-manager");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([file_entity_1.Files, customer_entity_1.Customers, user_entity_1.Users]),
            cache_manager_1.CacheModule.register({ isGlobal: true, ttl: 30000, store: cache_manager_redis_yet_1.redisStore }),
        ],
        providers: [files_service_1.FilesService],
        controllers: [files_controller_1.FileController],
    })
], FileModule);
//# sourceMappingURL=files.module.js.map