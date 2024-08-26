import { FilesService } from './files.service';
import { Response } from 'express';
export declare class FileController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, userId: number): Promise<{
        message: string;
    }>;
    getFileList(userId: number): Promise<import("./entities/file.entity").Files[]>;
    getPendingList(userId: number): Promise<import("./entities/file.entity").Files[]>;
    getFileInfo(userId: number, filename: string): Promise<import("./entities/customer.entity").Customers[]>;
    download(filename: string, userId: string, response: Response): Promise<Response<any, Record<string, any>>>;
    removeFile(filename: string, userId: string): Promise<{
        message: string;
    }>;
}
