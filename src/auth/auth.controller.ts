import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthCredentialsDto,
  LoginCredentialsDto,
} from './dto/auth-credentials.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user-dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Get("/:id")
  // async getTaskById(@Param("id") id: string) : Promise<Task> {
  //     return await this.authService.getUserById(id);
  // }
  //

  @Post('register')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserDto> {
    return await this.authService.createUser(authCredentialsDto);
  }

  @Post('login')
  async signIn(
    @Body() authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
