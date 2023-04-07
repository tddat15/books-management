import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/modal/book.model';

export class GetBooksResponse {
  @ApiProperty({
    description: 'Number of books to skip and then return the remainder',
    example: 0,
    required: true,
    nullable: false,
  })
  skip: number;

  @ApiProperty({
    description: 'The limit of number of books to take and return',
    example: 10,
    required: true,
    nullable: false,
  })
  take: number;

  @ApiProperty({
    description: 'the total number of the list of books',
    example: 10,
  })
  total: number;

  @ApiProperty({
    description: 'List of books',
    example: [
      {
        id: '1',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publishedDate: '1960-07-11',
        description:
          'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
        price: 12.99,
      },
      {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        publishedDate: '1949-06-08',
        description:
          "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives.",
        price: 10.99,
      },
    ],
  })
  data: Book[];
}
