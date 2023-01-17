import { ApiProperty } from '@nestjs/swagger';

export class AuthenticatedDto {
  @ApiProperty()
  accessToken: string;
}
