import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FileController } from './files.controller';
import { Files } from './entities/file.entity';
import { Customers } from './entities/customer.entity';
import { Users } from 'src/users/entities/user.entity';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Files, Customers, Users]),
    CacheModule.register({ isGlobal: true, ttl: 30000, store: redisStore }),
  ],
  providers: [FilesService],
  controllers: [FileController],
})
export class FileModule {}
