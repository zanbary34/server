import { Injectable, NotFoundException } from '@nestjs/common';
// import { existsSync, unlinkSync } from 'fs';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './entities/file.entity';
import { Customers } from './entities/customer.entity';
import * as path from 'path';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class FilesService {
  private readonly uploadPath = path.join(__dirname, '../../ExcelUploads');
  private readonly pendingPath = path.join(__dirname, '../../ExcelPending');

  constructor(
    @InjectRepository(Files)
    private readonly fileRepository: Repository<Files>,
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async uploadFile(file: Express.Multer.File, userId: number) {
    // Get the number of files in the excelUploads directory
    const uploadedFiles = await this.fileRepository.find({
      where: { f_status: 'uploaded' },
    });

    // Determine the target directory and status
    const targetDir =
      uploadedFiles.length >= 5 ? this.pendingPath : this.uploadPath;
    const status = uploadedFiles.length >= 5 ? 'pending' : 'uploaded';

    // Define the file path
    const filePath = path.join(
      targetDir,
      `${file.originalname}${userId.toString()}`,
    );
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

  async saveData(filePath: string, fileSaved: Files) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first sheet

    // Iterate through the rows and save to database
    const customers = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        // Skipping the header row
        const customer = {
          c_name: row.getCell(1).value as string,
          c_email: row.getCell(2).value as string,
          c_israeli_id: row.getCell(3).value as string,
          c_phone: row.getCell(4).value as string,
          f_id: fileSaved.f_id,
          file: fileSaved,
        };
        customers.push(customer);
      }
    });

    // Insert all customers into the database
    await this.customerRepository.save(customers);
  }

  async getFileList(userId: number) {
    console.log('from server');
    const result = await this.fileRepository.find({
      where: {
        user: { u_id: userId },
        f_status: 'uploaded',
      },
    });
    return result;
  }

  async getPendingList(userId: number) {
    console.log('from server');
    return await this.fileRepository.find({
      where: { user: { u_id: userId }, f_status: 'pending' },
    });
  }

  async getFileInfo(userId: number, filename: string) {
    console.log('from server');
    const fileInfo = await this.fileRepository.findOne({
      where: { user: { u_id: userId }, f_name: filename },
    });
    return await this.customerRepository.find({
      where: { file: { f_id: fileInfo.f_id } },
    });
  }

  async downloadFile(filename: string, userId: string) {
    const filePath = path.join(this.uploadPath, `${filename}${userId}`);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    return fs.readFileSync(filePath);
  }

  async removeFile(filename: string, userId: string) {
    const filePath = path.join(this.uploadPath, `${filename}${userId}`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const file = await this.fileRepository.findOne({
      where: { f_name: filename, user: { u_id: Number(userId) } },
      relations: ['customers'],
    });

    if (!file) {
      throw new NotFoundException('File not found');
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
  async movePendingFileToUploaded(userId: string) {
    const pendingFiles = await this.fileRepository.find({
      where: { f_status: 'pending' },
    });
    if (pendingFiles.length > 0) {
      const pendingFile = pendingFiles[0];

      // Move the first pending file to the excelUploads folder
      const pendingFilePath = path.join(
        this.pendingPath,
        `${pendingFile.f_name}${userId}`,
      );
      const newFilePath = path.join(
        this.uploadPath,
        `${pendingFile.f_name}${userId}`,
      );
      fs.renameSync(pendingFilePath, newFilePath);
      await this.fileRepository.update(
        { f_id: pendingFile.f_id },
        { f_status: 'uploaded' },
      );
    }
  }
}
