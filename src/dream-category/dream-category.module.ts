import { forwardRef, Module } from '@nestjs/common';
import { DreamCategoryService } from './dream-category.service';
import { DreamCategoryController } from './dream-category.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../auth/users.repository';
import { DreamCategoryRepository } from './dream-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DreamModule } from '../dream/dream.module';
import { DreamCategory } from './dream-category.entity';

@Module({
  providers: [
    DreamCategoryService,
    DreamCategoryRepository,
    JwtService,
    UsersRepository,
  ],
  controllers: [DreamCategoryController],
  imports: [
    TypeOrmModule.forFeature([DreamCategory, User]),
    AuthModule,
    forwardRef(() => DreamModule),
  ],
  exports: [DreamCategoryService],
})
export class DreamCategoryModule {}
