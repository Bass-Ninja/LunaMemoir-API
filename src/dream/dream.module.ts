import { Module } from '@nestjs/common';
import { DreamService } from './dream.service';
import { DreamController } from './dream.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dream } from './dream.entity';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [DreamService],
  controllers: [DreamController],
  imports: [TypeOrmModule.forFeature([Dream, User]), AuthModule],
})
export class DreamModule {}
