import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetBookByIdBookRequestParam {
  @ApiProperty({
    description: 'Id of the book',
    example: 'ekebVIcBJAlYcinjY2mK',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  id: string;
}
