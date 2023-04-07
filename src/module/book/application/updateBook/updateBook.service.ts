import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBookByIdRequestBody } from './updateBook.request-body';
import { Book } from 'src/modal/book.model';
import { BookRepository } from '../book.repository';

@Injectable()
export class UpdateBookByIdBookService {
  private readonly logger = new Logger(UpdateBookByIdBookService.name);

  constructor(private readonly bookRepository: BookRepository) {}

  async update(id: string, body: UpdateBookByIdRequestBody) {
    try {
      const book: Book = { id, ...body };
      const result = await this.bookRepository.update(book);
      return result;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      } else {
        this.logger.error(e);

        throw new InternalServerErrorException(
          'Server is not working now, please try later',
        );
      }
    }
  }
}
