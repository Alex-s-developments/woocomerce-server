import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { IUser } from '../users/interfaces/user.interface';
import { USER_REPOSITORY } from '../users/users.constants';
import { comparePassword } from '../users/users.utils';
import { JWT_SECRET_KEY } from './auth.constants';
import { AuthenticatedDto } from './dto/authenticated.dto';
// import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private jwtSecret = JWT_SECRET_KEY;

  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepo.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException(undefined, 'user not exist');
    }

    const isValidPass = await comparePassword(pass, user.password);
    if (!isValidPass)
      throw new UnauthorizedException(undefined, 'password invalid');

    return user;
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    const authenticated = new AuthenticatedDto();
    authenticated.accessToken = this.jwtService.sign(payload, {
      expiresIn: '8h',
    });
    return authenticated;
  }
}
