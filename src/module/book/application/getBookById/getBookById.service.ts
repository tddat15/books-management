import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from '../book.repository';

@Injectable()
export class GetBookByIdBookService {
  private readonly logger = new Logger(GetBookByIdBookService.name);

  constructor(private readonly bookRepository: BookRepository) {}

  async get(id: string) {
    try {
      const book = await this.bookRepository.get(id);

      return book;
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
