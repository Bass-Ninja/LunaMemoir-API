import { forwardRef, Module } from '@nestjs/common';
import { SymbolService } from './symbol.service';
import { SymbolController } from './symbol.controller';
import { DreamSymbolRepository } from './dream-symbol.repository';
import { UsersRepository } from '../auth/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DreamSymbol } from './symbol.entity';
import { DreamModule } from '../dream/dream.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    SymbolService,
    DreamSymbolRepository,
    JwtService,
    UsersRepository,
  ],
  controllers: [SymbolController],
  imports: [
    TypeOrmModule.forFeature([DreamSymbol, User]),
    AuthModule,
    forwardRef(() => DreamModule),
  ],
  exports: [SymbolService],
})
export class SymbolModule {}
