import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IShop } from '../interfaces/Shop';

@ObjectType()
export class Shop implements IShop {
  @Field(() => ID)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
