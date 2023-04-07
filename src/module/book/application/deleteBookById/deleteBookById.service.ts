import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from '../book.repository';

@Injectable()
export class DeleteBookByIdService {
  private readonly logger = new Logger(DeleteBookByIdService.name);

  constructor(private readonly bookRepository: BookRepository) {}
  async delete(id: string) {
    try {
      const book = await this.bookRepository.delete(id);
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
