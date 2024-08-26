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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const ExcelJS = require("exceljs");
const fs = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const file_entity_1 = require("./entities/file.entity");
const customer_entity_1 = require("./entities/customer.entity");
const path = require("path");
const user_entity_1 = require("../users/entities/user.entity");
let FilesService = class FilesService {
    constructor(fileRepository, customerRepository, userRepository) {
        this.fileRepository = fileRepository;
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.uploadPath = path.join(__dirname, '../../ExcelUploads');
        this.pendingPath = path.join(__dirname, '../../ExcelPending');
    }
    async uploadFile(file, userId) {
        const uploadedFiles = await this.fileRepository.find({
            where: { f_status: 'uploaded' },
        });
        const targetDir = uploadedFiles.length >= 5 ? this.pendingPath : this.uploadPath;
        const status = uploadedFiles.length >= 5 ? 'pending' : 'uploaded';
        const filePath = path.join(targetDir, `${file.originalname}${userId.toString()}`);
        fs.writeFileSync(filePath, file.buffer);
        const existUser = await this.userRepository.findOne({
            where: { u_id: userId },
        });
        const fileSaved = await this.fileRepository.save({
            f_name: file.originalname,
            f_status: status,
            f_userId: userId,
            user: existUser,
        });
        await this.saveData(filePath, fileSaved);
        return { message: 'File uploaded successfully' };
    }
    async saveData(filePath, fileSaved) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const customers = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const customer = {
                    c_name: row.getCell(1).value,
                    c_email: row.getCell(2).value,
                    c_israeli_id: row.getCell(3).value,
                    c_phone: row.getCell(4).value,
                    f_id: fileSaved.f_id,
                    file: fileSaved,
                };
                customers.push(customer);
            }
        });
        await this.customerRepository.save(customers);
    }
    async getFileList(userId) {
        console.log('from server');
        const result = await this.fileRepository.find({
            where: {
                user: { u_id: userId },
                f_status: 'uploaded',
            },
        });
        return result;
    }
    async getPendingList(userId) {
        console.log('from server');
        return await this.fileRepository.find({
            where: { user: { u_id: userId }, f_status: 'pending' },
        });
    }
    async getFileInfo(userId, filename) {
        console.log('from server');
        const fileInfo = await this.fileRepository.findOne({
            where: { user: { u_id: userId }, f_name: filename },
        });
        return await this.customerRepository.find({
            where: { file: { f_id: fileInfo.f_id } },
        });
    }
    async downloadFile(filename, userId) {
        const filePath = path.join(this.uploadPath, `${filename}${userId}`);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('File not found');
        }
        return fs.readFileSync(filePath);
    }
    async removeFile(filename, userId) {
        const filePath = path.join(this.uploadPath, `${filename}${userId}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        const file = await this.fileRepository.findOne({
            where: { f_name: filename, user: { u_id: Number(userId) } },
            relations: ['customers'],
        });
        if (!file) {
            throw new common_1.NotFoundException('File not found');
        }
        await this.fileRepository.remove(file);
        const uploadedFiles = await this.fileRepository.find({
            where: { f_status: 'uploaded' },
        });
        if (uploadedFiles.length < 5) {
            await this.movePendingFileToUploaded(userId);
        }
        return { message: 'File removed successfully' };
    }
    async movePendingFileToUploaded(userId) {
        const pendingFiles = await this.fileRepository.find({
            where: { f_status: 'pending' },
        });
        if (pendingFiles.length > 0) {
            const pendingFile = pendingFiles[0];
            const pendingFilePath = path.join(this.pendingPath, `${pendingFile.f_name}${userId}`);
            const newFilePath = path.join(this.uploadPath, `${pendingFile.f_name}${userId}`);
            fs.renameSync(pendingFilePath, newFilePath);
            await this.fileRepository.update({ f_id: pendingFile.f_id }, { f_status: 'uploaded' });
        }
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.Files)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customers)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map