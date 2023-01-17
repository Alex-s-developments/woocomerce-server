import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { TimestampsEnitty } from './timestamps.entity';

@ObjectType('Base')
export class BaseEntity extends TimestampsEnitty {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'primary key (ID)' })
  id: number;
}
