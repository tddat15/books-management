import {
  Controller,
  Query,
  Get,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBooksService } from './getBooks.service';
import { GetBookByIdBookRequestQuery } from './getBooks.request-query';
import { GetBooksResponse } from './getBooks.response';

@ApiTags('books')
@Controller('books')
export class GetBooksController {
  constructor(private readonly bookService: GetBooksService) {}

  @ApiOperation({ description: 'Get a list of all books in Elasticsearch.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiResponse({ type: GetBooksResponse, status: HttpStatus.OK })
  @Get()
  async create(
    @Query() query: GetBookByIdBookRequestQuery,
  ): Promise<GetBooksResponse> {
    return await this.bookService.search(query);
  }
}
