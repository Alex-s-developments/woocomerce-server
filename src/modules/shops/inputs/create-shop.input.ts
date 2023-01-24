import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ShopEntity } from '../entities/shop.entity';

@InputType()
export class CreateShopInput {
  @Field(() => String)
  @MinLength(5)
  name: string;
}

export const mapCreateShopInputToShop = (
  input: CreateShopInput,
  ownerId: number,
) => {
  const shop = new ShopEntity();
  shop.name = input.name;

  const owner = new UserEntity();
  owner.id = ownerId;
  shop.owner = owner;

  return shop;
};
