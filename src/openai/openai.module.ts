import { Global, Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';

@Global()
@Module({
  providers: [OpenaiService],
  exports: [OpenaiService],
  controllers: [OpenaiController],
})
export class OpenAIModule {}
