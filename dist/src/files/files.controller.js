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
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const cache_manager_1 = require("@nestjs/cache-manager");
let FileController = class FileController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file, userId) {
        return await this.filesService.uploadFile(file, userId);
    }
    async getFileList(userId) {
        return await this.filesService.getFileList(userId);
    }
    async getPendingList(userId) {
        return await this.filesService.getPendingList(userId);
    }
    async getFileInfo(userId, filename) {
        return await this.filesService.getFileInfo(userId, filename);
    }
    async download(filename, userId, response) {
        const file = await this.filesService.downloadFile(filename, userId);
        return response
            .set(`Content-Disposition', attachment; filename=${filename}`)
            .send(file);
    }
    async removeFile(filename, userId) {
        return await this.filesService.removeFile(filename, userId);
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileList", null);
__decorate([
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getPendingList", null);
__decorate([
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Get)('fileinfo'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFileInfo", null);
__decorate([
    (0, common_1.Get)('download'),
    __param(0, (0, common_1.Query)('filename')),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "download", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Query)('filename')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "removeFile", null);
exports.FileController = FileController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FileController);
//# sourceMappingURL=files.controller.js.map