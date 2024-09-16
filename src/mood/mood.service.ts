import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../auth/users.repository';
import { FilterDto } from '../common/dto/filter.dto';
import { plainToInstance } from 'class-transformer';
import { MoodDto } from './dto/mood.dto';
import { Mood } from './mood.entity';
import { MoodRepository } from './mood.repository';

@Injectable()
export class MoodService {
  private readonly logger = new Logger(MoodService.name);

  constructor(
    private readonly moodRepository: MoodRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getMoods(filterDto: FilterDto): Promise<MoodDto[]> {
    this.logger.log('Listing moods');
    return plainToInstance(
      MoodDto,
      await this.moodRepository.getMoods(filterDto),
    );
  }

  async getOrCreateMood(moodDto: MoodDto): Promise<Mood> {
    let mood: Mood;
    try {
      if (moodDto && moodDto.id) {
        mood = await this.moodRepository.findOne({
          where: { id: moodDto.id },
        });
      } else {
        mood = this.moodRepository.create({
          name: moodDto.name.toUpperCase(),
        });
        await this.moodRepository.save(mood);
      }
    } catch (error) {
      throw new Error(error.message);
    }
    return mood;
  }
}
