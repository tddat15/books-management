import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRequestBody {
  @ApiProperty({
    description: 'The title of the book',
    required: true,
    nullable: false,
    example: 'To Kill a Mockingbird',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    required: true,
    nullable: false,
    example: 'Harper Lee',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  author: string;

  @ApiProperty({
    description: 'The date the book was published',
    required: true,
    nullable: false,
    example: '1960-07-11',
  })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }: TransformFnParams) => new Date(value))
  publishedDate: Date;

  @ApiProperty({
    description: 'A brief description of the book',
    required: true,
    nullable: false,
    example:
      'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  @MinLength(100)
  description: string;

  @ApiProperty({
    description: 'The price of the book',
    required: true,
    nullable: false,
    example: 12.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  price: number;
}
