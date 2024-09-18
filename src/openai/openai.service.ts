import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IChatRequest, IChatResponse } from './openai.interface';

@Injectable()
export class OpenaiService {
  private openAiService: OpenAI;

  constructor(private configService: ConfigService) {
    this.openAiService = new OpenAI({
      apiKey: process.env.OPEN_AI_SECRET_KEY,
    });
  }

  async getMessagesData(request: IChatRequest): Promise<OpenAI.ChatCompletion> {
    return this.openAiService.chat.completions.create({
      model: process.env.OPENAI_API_MODEL,
      messages: request.messages,
    });
  }

  getChatOpenaiResponse(message: OpenAI.ChatCompletion): IChatResponse {
    return {
      success: true,
      result: message?.choices?.length && message?.choices[0],
    };
  }
}
