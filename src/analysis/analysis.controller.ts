import { Controller } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly openAIService: OpenaiService) {}

  // @Post('dream')
  // analyzeDream(@Body('description') description: string) {
  //   if (!description) {
  //     throw new Error('Description is required');
  //   }
  //
  //   return this.openAIService.chatGptRequest(description, []);
  // }
}
