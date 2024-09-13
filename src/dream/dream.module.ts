import { forwardRef, Module } from '@nestjs/common';
import { DreamService } from './dream.service';
import { DreamController } from './dream.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dream } from './dream.entity';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DreamRepository } from './dream.repository';
import { UsersRepository } from '../auth/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SymbolModule } from '../symbol/symbol.module';
import { DreamCategoryModule } from '../dream-category/dream-category.module';

@Module({
  providers: [DreamService, DreamRepository, JwtService, UsersRepository],
  controllers: [DreamController],
  imports: [
    TypeOrmModule.forFeature([Dream, User]),
    AuthModule,
    forwardRef(() => SymbolModule),
    forwardRef(() => DreamCategoryModule),
  ],
})
export class DreamModule {}
