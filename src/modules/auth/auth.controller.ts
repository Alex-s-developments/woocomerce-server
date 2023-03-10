import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { AuthService } from './auth.service';
import { AuthenticatedDto } from './dto/authenticated.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Body() body: LoginDto, @Request() req): Promise<AuthenticatedDto> {
    return this.authService.login(req.user);
  }
}
