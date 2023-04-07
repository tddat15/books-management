import {
  Controller,
  Param,
  Get,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetBookByIdBookService } from './getBookById.service';
import { GetBookByIdBookRequestParam } from './getBookById.request-param';
import { GetBookByIdResponse } from './getBookById.response';

@ApiTags('books')
@Controller('books')
export class GetBookByIdController {
  constructor(private readonly bookService: GetBookByIdBookService) {}

  @ApiOperation({ description: 'Get a specific book by ID.' })
  @ApiResponse({ type: GetBookByIdResponse, status: HttpStatus.OK })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Get(':id')
  async get(@Param() { id }: GetBookByIdBookRequestParam) {
    return await this.bookService.get(id);
  }
}
