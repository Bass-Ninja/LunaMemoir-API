import { Expose, Transform, Type } from 'class-transformer';
import { UserDto } from '../../auth/dto/user-dto';

export class DreamDto {
  @Expose() id: string;
  @Expose() title: string;
  @Expose() description: string;
  @Expose() mood: string;
  @Expose() tags?: string[];
  @Type(() => UserDto) // Ensure UserDto is used
  user: UserDto;
}
