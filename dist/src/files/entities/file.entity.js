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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const customer_entity_1 = require("./customer.entity");
let Files = class Files {
};
exports.Files = Files;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Files.prototype, "f_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Files.prototype, "f_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Files.prototype, "f_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.files, { onDelete: 'CASCADE' }),
    __metadata("design:type", Object)
], Files.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customers, (customer) => customer.file),
    __metadata("design:type", Object)
], Files.prototype, "customers", void 0);
exports.Files = Files = __decorate([
    (0, typeorm_1.Entity)()
], Files);
//# sourceMappingURL=file.entity.js.map