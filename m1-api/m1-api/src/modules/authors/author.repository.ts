import { DataSource } from 'typeorm';
import { AuthorEntity } from '../database/entities/author.entity';
import { Injectable } from '@nestjs/common';
import {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from './author.model';

@Injectable()
export class AuthorRepository {
  private readonly authorRepository =
    this.dataSource.getRepository(AuthorEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async getAuthor(id: string): Promise<AuthorModel> {
    return this.authorRepository.findOneBy({ id });
  }

  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );
    return result;
  }

  public async updateAuthor(
    id: string,
    input: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    await this.authorRepository.update(id, input);
    return this.getAuthor(id);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }

  public async incrementBookCount(authorId: string): Promise<void> {
    await this.authorRepository.increment({ id: authorId }, 'bookCount', 1);
  }

  public async decrementBookCount(authorId: string): Promise<void> {
    await this.authorRepository.decrement({ id: authorId }, 'bookCount', 1);
  }
  public async getWeightedAverageRatingForAuthor(
    authorId: string,
  ): Promise<number> {
    const result = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.books', 'book')
      .leftJoinAndSelect('book.reviews', 'review')
      .select('AVG(review.rating)', 'average')
      .where('author.id = :authorId', { authorId })
      .getRawOne();
    return parseFloat(result.average);
  }



  public async updateAverageRating(authorId: string, averageRating: number): Promise<void> {
    await this.authorRepository.update(authorId, { averageRating });
  }


}
