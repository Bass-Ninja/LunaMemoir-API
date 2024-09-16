import { forwardRef, Module } from '@nestjs/common';
import { MoodController } from './mood.controller';
import { MoodService } from './mood.service';
import { MoodRepository } from './mood.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../auth/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DreamModule } from '../dream/dream.module';
import { Mood } from './mood.entity';

@Module({
  controllers: [MoodController],
  providers: [MoodService, MoodRepository, JwtService, UsersRepository],
  imports: [
    TypeOrmModule.forFeature([Mood, User]),
    AuthModule,
    forwardRef(() => DreamModule),
  ],
  exports: [MoodService],
})
export class MoodModule {}
