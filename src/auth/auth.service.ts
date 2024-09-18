import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  AuthCredentialsDto,
  LoginCredentialsDto,
} from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { UserDto } from './dto/user-dto';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(authCredentials: AuthCredentialsDto): Promise<UserDto> {
    return plainToInstance(
      UserDto,
      this.usersRepository.createUser(authCredentials),
      { excludeExtraneousValues: true },
    );
  }

  async signIn(authCredentials: LoginCredentialsDto): Promise<{
    accessToken: string;
    tokenExpiration: string;
    name: string;
  }> {
    const { email, password } = authCredentials;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);

      // Decode the token to get expiration time
      const decodedToken: any = this.jwtService.decode(accessToken) as {
        exp: number;
      };

      if (!decodedToken || !decodedToken.exp) {
        throw new UnauthorizedException(
          'Failed to decode token or token has no expiration date',
        );
      }

      // Format the expiration date in UTC
      const expirationDate = dayjs
        .unix(decodedToken.exp)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ssZ');

      return {
        accessToken,
        tokenExpiration: expirationDate,
        name: user.firstName,
      };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
