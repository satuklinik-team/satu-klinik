import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class FindUsersDto implements Prisma.UsersFindManyArgs {
  @IsObject()
  @IsOptional()
  cursor?: Prisma.UsersWhereUniqueInput;

  @IsObject()
  @IsOptional()
  distinct?: Prisma.UsersScalarFieldEnum | Prisma.UsersScalarFieldEnum[];

  @IsObject()
  @IsOptional()
  include?: Prisma.UsersInclude<DefaultArgs>;

  @IsObject()
  @IsOptional()
  orderBy?:
    | Prisma.UsersOrderByWithRelationInput
    | Prisma.UsersOrderByWithRelationInput[];

  @IsObject()
  @IsOptional()
  select?: Prisma.UsersSelect<DefaultArgs>;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  skip?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  take?: number;

  @IsObject()
  @IsOptional()
  where?: Prisma.UsersWhereInput;
}
