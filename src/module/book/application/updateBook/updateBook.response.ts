import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookResponse {
  @ApiProperty({
    description: 'The title of the book',
    required: true,
    nullable: false,
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the book',
    required: true,
    nullable: false,
    example: 'To Kill a Mockingbird',
  })
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    required: true,
    nullable: false,
    example: 'Harper Lee',
  })
  author: string;

  @ApiProperty({
    description: 'The date the book was published',
    required: true,
    nullable: false,
    example: '1960-07-11',
  })
  publishedDate: Date;

  @ApiProperty({
    description: 'A brief description of the book',
    required: true,
    nullable: false,
    example:
      'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the book',
    required: true,
    nullable: false,
    example: 12.99,
  })
  price: number;
}
