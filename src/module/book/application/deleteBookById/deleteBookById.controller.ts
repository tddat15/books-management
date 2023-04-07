import {
  Controller,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteBookByIdService } from './deleteBookById.service';
import { DeleteBookByIdRequestParam } from './deleteBookById.request-param';

@ApiTags('books')
@Controller('books')
export class DeleteBookByIdController {
  constructor(private readonly bookService: DeleteBookByIdService) {}

  @ApiOperation({ description: 'Delete a book by id.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Delete(':id')
  async delete(@Param() { id }: DeleteBookByIdRequestParam) {
    return await this.bookService.delete(id);
  }
}
