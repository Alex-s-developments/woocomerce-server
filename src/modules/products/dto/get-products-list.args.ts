import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetProductsListArgs {
  @Field({ nullable: true })
  take?: number;

  @Field({ nullable: true })
  skip: number;
}
