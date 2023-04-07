import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { index } from '../book.enum';
import { Book } from '../../../modal/book.model';
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class BookRepository {
  private readonly logger = new Logger(BookRepository.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {
    this.createIndex(index).then((value) => {
      console.log(value);
    });
  }

  async get(id: string): Promise<Book> {
    const query = {
      index: index,
      query: {
        ids: {
          values: [id],
        },
      },
    };
    const response = await this.elasticsearchService.search(query);
    if (response.hits.hits.length == 0) {
      this.logger.error(`Book with id = ${id} not found`);
      throw new NotFoundException(`Book with id = ${id} not found`);
    }
    const book = this.from(new Book(), response.hits.hits[0]);
    this.logger.log('Book info: ', book);
    return book;
  }

  async search(
    q: string,
    offset: number,
    limit: number,
    order: string,
    dimension: string,
  ): Promise<{ books: Book[]; count: number }> {
    const must = [];
    if (q && q.length > 0) {
      must.push({
        multi_match: {
          fields: ['title', 'author'],
          query: q,
          type: 'phrase_prefix',
        },
      });
    }

    const orderByKeyword = `${order}.keyword`;
    const query = {
      index: index,
      query: {
        bool: {
          must: must,
        },
      },
      size: limit,
      from: offset,
      sort: [
        {
          [orderByKeyword]: {
            order: dimension,
            unmapped_type: 'string',
          },
        },
      ],
    };
    const { count } = await this.elasticsearchService.count({
      index: index,
      query: {
        bool: {
          must: must,
        },
      },
    });

    const booksResponse = await this.elasticsearchService.search(query);
    const books = booksResponse.hits.hits.map((hit) => {
      const book = new Book();
      return this.from(book, hit);
    });

    this.logger.log('List of books', books);
    this.logger.log('Total list of books', count);

    return { books, count };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.elasticsearchService.delete({ index, id });

      this.logger.log(`Books with id = ${id} is deleted`);

      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        this.logger.error(`Book with id = ${id} not found`);

        throw new NotFoundException(`Book with id = ${id} not found`);
      }
    }
  }

  async create(book: Book): Promise<Book> {
    const query = {
      index: index,
      document: book,
    };

    const response = await this.elasticsearchService.index(query);
    book.id = response._id;

    this.logger.log(`Created a book id = ${response._id}`);
    return book;
  }

  async update(book: Book): Promise<Book> {
    try {
      await this.elasticsearchService.update({
        index: index,
        id: book.id,
        body: {
          doc: book,
          doc_as_upsert: false,
        },
      });

      this.logger.log(`Book with id = ${book.id} is updated`);

      return book;
    } catch (error) {
      console.log(error);
      if (error.statusCode === 404) {
        this.logger.error(`Book with id = ${book.id} not found`);

        throw new NotFoundException(`Book with id = ${book.id} not found`);
      }
    }
  }

  async seeds(): Promise<boolean> {
    try {
      await this.elasticsearchService.deleteByQuery({
        index: 'books',
        body: {
          query: {
            match_all: {},
          },
        },
      });

      this.logger.log(`All documents in ${index} deleted`);

      const createExampleResponse = await this.elasticsearchService.bulk({
        index: 'books',
        body: [
          { index: {} },
          {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            publishedDate: '1960-07-11',
            description:
              'The story of racial injustice and the loss of innocence in the American South during the Great Depression.',
            price: 12.99,
          },
          { index: {} },
          {
            title: '1984',
            author: 'George Orwell',
            publishedDate: '1949-06-08',
            description:
              "A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people's lives.",
            price: 10.99,
          },
          { index: {} },
          {
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            publishedDate: '1951-07-16',
            description:
              'The story of Holden Caulfield, a teenage boy who struggles with alienation and loss after being expelled from his prep school.',
            price: 9.99,
          },
          { index: {} },
          {
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            publishedDate: '1813-01-28',
            description:
              'A romantic novel that follows the emotional development of Elizabeth Bennet, who learns the error of making hasty judgments.',
            price: 8.99,
          },
          { index: {} },
          {
            title: 'The Hobbit',
            author: 'J.R.R. Tolkien',
            publishedDate: '1937-09-21',
            description:
              'A fantasy novel about the adventures of hobbit Bilbo Baggins, who is hired by the wizard Gandalf to help a group of dwarves reclaim their treasure from a dragon.',
            price: 11.99,
          },
          { index: {} },
          {
            title: 'The Adventures of Huckleberry Finn',
            author: 'Mark Twain',
            publishedDate: '1884-12-10',
            description:
              'A novel about the adventures of a young boy named Huck Finn and his friend Jim, a runaway slave, as they travel down the Mississippi River.',
            price: 7.99,
          },
          { index: {} },
          {
            title: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            publishedDate: '1954-07-29',
            description:
              'A high fantasy novel that follows the quest of hobbit Frodo Baggins to destroy the One Ring, which was created by the Dark Lord Sauron.',
            price: 14.99,
          },
          { index: {} },
          {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publishedDate: '1925-04-10',
            description:
              'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
            price: 9.99,
          },
        ],
      });

      this.logger.log(
        `${createExampleResponse.items.length} documents created`,
      );

      return true;
    } catch (error) {
      this.logger.error(error);
    }
  }

  from(book: Book, bookRes: SearchHit): Book {
    book.id = bookRes._id;
    book.title = bookRes._source['title'];
    book.author = bookRes._source['author'];
    book.publishedDate = bookRes._source['publishedDate'];
    book.description = bookRes._source['description'];
    book.price = bookRes._source['price'];
    return book;
  }

  async createIndex(indexName) {
    if (await this.elasticsearchService.indices.exists({ index: indexName })) {
      console.log('Index', indexName, 'does already exist');
      return false;
    }
    return await this.elasticsearchService.indices.create({
      index: indexName,
    });
  }
}
