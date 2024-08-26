import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  // Get,
  // Param,
  // Res,
  Query,
  Delete,
  Res,
  Get,
  // Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Response } from 'express';
import { FilesService } from './files.service';
import { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('files')
export class FileController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('userId') userId: number,
  ) {
    return await this.filesService.uploadFile(file, userId);
  }

  @Get('list')
  async getFileList(@Query('userId') userId: number) {
    return await this.filesService.getFileList(userId);
  }
  @Get('pending')
  async getPendingList(@Query('userId') userId: number) {
    return await this.filesService.getPendingList(userId);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('fileinfo')
  async getFileInfo(
    @Query('userId') userId: number,
    @Query('filename') filename: string,
  ) {
    return await this.filesService.getFileInfo(userId, filename);
  }

  @Get('download')
  async download(
    @Query('filename') filename: string,
    @Query('userId') userId: string,
    @Res() response: Response,
  ) {
    const file = await this.filesService.downloadFile(filename, userId);
    return response
      .set(`Content-Disposition', attachment; filename=${filename}`)
      .send(file);
  }

  @Delete('remove')
  async removeFile(
    @Query('filename') filename: string,
    @Query('userId') userId: string,
  ) {
    return await this.filesService.removeFile(filename, userId);
  }
}
