// import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
// import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}
