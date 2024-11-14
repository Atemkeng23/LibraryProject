// book.repository.ts
import { DataSource, Repository } from 'typeorm';
import { BookEntity } from '../database/entities/book.entity';
import { Injectable } from '@nestjs/common';
import { BookModel, CreateBookModel, UpdateBookModel } from './book.model';

@Injectable()
export class BookRepository extends Repository<BookEntity>{
  private readonly bookRepository = this.dataSource.getRepository(BookEntity);

  constructor(private readonly dataSource: DataSource) {
    super(BookEntity, dataSource.createEntityManager());
  }

  public async listBooks(): Promise<BookEntity[]> {
    return this.bookRepository.find();
  }

  public async getBooksByAuthor(authorId: string): Promise<BookEntity[]> {
    return this.bookRepository.find({ where: { authorId } });
  }

  public async getBook(id: string): Promise<BookEntity> {
    return this.bookRepository.findOneBy({ id });
  }

  public async createBook(input: CreateBookModel): Promise<BookEntity> {
    const result = await this.bookRepository.save(
      this.bookRepository.create(input),
    );
    return result;
  }

  public async updateBook(
    id: string,
    input: UpdateBookModel,
  ): Promise<BookEntity> {
    await this.bookRepository.update(id, input);
    return this.getBook(id);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
