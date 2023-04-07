import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GetBookByIdBookRequestQuery } from './getBooks.request-query';
import { BookRepository } from '../book.repository';
import { GetBooksResponse } from './getBooks.response';

@Injectable()
export class GetBooksService {
  private readonly logger = new Logger(GetBooksService.name);

  constructor(private readonly bookRepository: BookRepository) {}

  async search(query: GetBookByIdBookRequestQuery): Promise<GetBooksResponse> {
    try {
      const { order, dimension, search, skip, take } = query;
      const { books, count } = await this.bookRepository.search(
        search,
        skip,
        take,
        order,
        dimension,
      );

      return {
        take,
        skip,
        total: count,
        data: books,
      };
    } catch (e) {
      this.logger.error(e);

      throw new InternalServerErrorException(
        'Server is not working now, please try later',
      );
    }
  }
}
