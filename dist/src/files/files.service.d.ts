import { Repository } from 'typeorm';
import { Files } from './entities/file.entity';
import { Customers } from './entities/customer.entity';
import { Users } from 'src/users/entities/user.entity';
export declare class FilesService {
    private readonly fileRepository;
    private customerRepository;
    private userRepository;
    private readonly uploadPath;
    private readonly pendingPath;
    constructor(fileRepository: Repository<Files>, customerRepository: Repository<Customers>, userRepository: Repository<Users>);
    uploadFile(file: Express.Multer.File, userId: number): Promise<{
        message: string;
    }>;
    saveData(filePath: string, fileSaved: Files): Promise<void>;
    getFileList(userId: number): Promise<Files[]>;
    getPendingList(userId: number): Promise<Files[]>;
    getFileInfo(userId: number, filename: string): Promise<Customers[]>;
    downloadFile(filename: string, userId: string): Promise<Buffer>;
    removeFile(filename: string, userId: string): Promise<{
        message: string;
    }>;
    movePendingFileToUploaded(userId: string): Promise<void>;
}
