import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { BookOrder, Dimension } from '../../book.enum';

export class GetBookByIdBookRequestQuery {
  @ApiProperty({
    description: 'search by title or author of the book. ',
    example: 'George',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    description: 'Number of books to skip and then return the remainder',
    example: 0,
    required: true,
    nullable: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  skip: 0;

  @ApiProperty({
    description: 'The limit of number of books to take and return',
    example: 10,
    required: true,
    nullable: false,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  take: 10;

  @ApiProperty({
    description: 'Order list of books by key word',
    example: BookOrder.title,
    required: false,
    nullable: false,
    enum: BookOrder,
  })
  @IsEnum(BookOrder)
  order: BookOrder.title;

  @ApiProperty({
    description: 'Order type',
    example: Dimension.asc,
    required: false,
    nullable: false,
    enum: Dimension,
  })
  @IsEnum(Dimension)
  dimension: Dimension.asc;
}
