import { Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@ApiTags('books')
@Controller('books')
export class SeedsController {
  constructor(private readonly bookService: SeedsService) {}

  @ApiOperation({ description: 'Delete all books and creates example book.' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('/seeds')
  async seeds() {
    try {
      return await this.bookService.seeds();
    } catch (e) {
      throw new Error(e);
    }
  }
}
