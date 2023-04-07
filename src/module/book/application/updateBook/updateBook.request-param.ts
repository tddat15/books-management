import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookByIdBookRequestParam {
  @ApiProperty({
    description: 'Id of the book',
    example: 'ekebVIcBJAlYcinjY2mK',
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  id: string;
}
