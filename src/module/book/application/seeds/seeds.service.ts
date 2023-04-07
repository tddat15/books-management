import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { BookRepository } from '../book.repository';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(private readonly bookRepository: BookRepository) {}

  async seeds() {
    try {
      const bookResult = await this.bookRepository.seeds();

      return bookResult;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(
        'Server is not working now, please try later',
      );
    }
  }
}
