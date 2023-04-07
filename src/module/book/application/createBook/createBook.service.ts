import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookRequestBody } from './createBook.request-body';
import { BookRepository } from '../book.repository';

@Injectable()
export class CreateBookService {
  private readonly logger = new Logger(CreateBookService.name);

  constructor(private readonly bookRepository: BookRepository) {}

  async create(body: CreateBookRequestBody) {
    try {
      const book = { id: null, ...body };
      const bookResult = await this.bookRepository.create(book);

      return bookResult;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Server is not working now, please try later',
      );
    }
  }
}
