import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('user')
@ObjectType('user')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column({ select: false })
  @Field(() => String)
  password: string;
}
