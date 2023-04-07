import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { CreateBookService } from './createBook.service';
import { CreateBookRequestBody } from './createBook.request-body';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookResponse } from './createBook.response';

@ApiTags('books')
@Controller('books')
export class CreateBookController {
  constructor(private readonly bookService: CreateBookService) {}

  @ApiOperation({ description: 'Creates a new book.' })
  @ApiResponse({ type: CreateBookResponse, status: HttpStatus.OK })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  @ApiBody({ type: CreateBookRequestBody })
  async create(@Body() body: CreateBookRequestBody) {
    try {
      return await this.bookService.create(body);
    } catch (e) {
      throw new Error(e);
    }
  }
}
