import { Injectable, UnauthorizedException } from '@nestjs/common';
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
import * as dayjs from 'dayjs'; // You can use 'dayjs' or similar to format dates

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

  async signIn(
    authCredentials: LoginCredentialsDto,
  ): Promise<{ accessToken: string; tokenExpiration: string; name: string }> {
    const { email, password } = authCredentials;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);

      // Decode the token to get expiration time
      const decodedToken: any = this.jwtService.decode(accessToken);
      const expirationDate = dayjs
        .unix(decodedToken.exp)
        .format('YYYY-MM-DD HH:mm:ss');

      return {
        accessToken,
        tokenExpiration: expirationDate,
        name: user.firstName,
      };
    } else {
      throw new UnauthorizedException('Wrong credentials');
    }
  }
}
