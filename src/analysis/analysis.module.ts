import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { OpenAIModule } from '../openai/openai.module';

@Module({
  providers: [],
  controllers: [AnalysisController],
  imports: [OpenAIModule],
})
export class AnalysisModule {}
