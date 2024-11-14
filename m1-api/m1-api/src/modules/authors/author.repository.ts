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
  // Liste des auteurs
  public async listAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  //Récupérer un auteur par ID
  public async getAuthor(id: string): Promise<AuthorModel> {
    return this.authorRepository.findOneBy({ id });
  }
    // Créer un auteur
  public async createAuthor(input: CreateAuthorModel): Promise<AuthorModel> {
    const result = await this.authorRepository.save(
      this.authorRepository.create(input),
    );
    return result;
  }
  // Mettre à jour un auteur
  public async updateAuthor(
    id: string,
    input: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    await this.authorRepository.update(id, input);
    return this.getAuthor(id);
  }
  // Supprimer un auteur
  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
    // Incrémenter le nombre de livres d'un auteur
  public async incrementBookCount(authorId: string): Promise<void> {
    await this.authorRepository.increment({ id: authorId }, 'bookCount', 1);
  }
    // Décrémenter le nombre de livres d'un auteur
  public async decrementBookCount(authorId: string): Promise<void> {
    await this.authorRepository.decrement({ id: authorId }, 'bookCount', 1);
  }
    // Récupérer la moyenne des notes pondérées pour un auteur
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
