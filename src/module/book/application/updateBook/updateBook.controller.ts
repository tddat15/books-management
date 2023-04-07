import {
  Controller,
  Put,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateBookByIdBookRequestParam } from './updateBook.request-param';
import { UpdateBookByIdBookService } from './updateBook.service';
import { UpdateBookByIdRequestBody } from './updateBook.request-body';
import { UpdateBookResponse } from './updateBook.response';

@ApiTags('books')
@Controller('books')
export class UpdateBookByIdController {
  constructor(private readonly bookService: UpdateBookByIdBookService) {}

  @ApiOperation({ description: 'Updates an existing book by ID.' })
  @ApiResponse({ type: UpdateBookResponse, status: HttpStatus.OK })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  @ApiBody({ type: UpdateBookByIdRequestBody })
  async update(
    @Param() { id }: UpdateBookByIdBookRequestParam,
    @Body() body: UpdateBookByIdRequestBody,
  ) {
    return await this.bookService.update(id, body);
  }
}
