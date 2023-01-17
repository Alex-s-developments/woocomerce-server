import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JWT_SECRET_KEY } from './auth.constants';
import { AuthenticatedDto } from './dto/authenticated.dto';
// import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private jwtSecret = JWT_SECRET_KEY;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const authenticated = new AuthenticatedDto();
    authenticated.accessToken = this.jwtService.sign(payload, {
      expiresIn: '8h',
    });
    return authenticated;
  }
}
