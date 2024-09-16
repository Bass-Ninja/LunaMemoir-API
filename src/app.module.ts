import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DreamModule } from './dream/dream.module';
import { configValidationSchema } from './config.schema';
import { CommonModule } from './common/common.module';
import { SymbolModule } from './symbol/symbol.module';
import { DreamCategoryModule } from './dream-category/dream-category.module';
import { MoodModule } from './mood/mood.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE || 'dev'}`, // Use a default stage if not set
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      }),
    }),
    AuthModule,
    DreamModule,
    CommonModule,
    SymbolModule,
    DreamCategoryModule,
    MoodModule,
  ],
})
export class AppModule {}
