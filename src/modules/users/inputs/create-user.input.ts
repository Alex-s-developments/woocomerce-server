import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  @MinLength(8)
  password: string;
}

export const mapCreateUserInputToUser = (
  input: CreateUserInput,
): UserEntity => {
  const user = new UserEntity();
  user.username = input.username;
  user.password = input.password;
  return user;
};
