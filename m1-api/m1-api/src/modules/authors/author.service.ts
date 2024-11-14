import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import { AuthorEntity } from '../database/entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
  ) {}

  // Liste des auteurs
  public async listAuthors(): Promise<AuthorEntity[]> {
    return this.authorRepository.find();
  }

  // Récupérer un auteur par ID
  public async getAuthor(id: string): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Auteur avec l'ID ${id} introuvable`);
    }
    return author;
  }

  // Créer un auteur
  public async createAuthor(input: CreateAuthorDto): Promise<AuthorEntity> {
    const newAuthor = this.authorRepository.create(input);
    return this.authorRepository.save(newAuthor);
  }

  // Mettre à jour un auteur
  public async updateAuthor(id: string, input: UpdateAuthorDto): Promise<AuthorEntity> {
    const author = await this.getAuthor(id);

    // Mise à jour des champs disponibles dans l'input
    if (input.firstName) {
      author.firstName = input.firstName;
    }
    if (input.lastName) {
      author.lastName = input.lastName;
    }
    if (input.photoUrl) {
      author.photoUrl = input.photoUrl;
    }
    if (input.biography) {
      author.biography = input.biography;
    }

    return this.authorRepository.save(author);
  }

  // Supprimer un auteur
  public async deleteAuthor(id: string): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Auteur avec l'ID ${id} introuvable`);
    }
  }

  // Obtenir la moyenne pondérée des évaluations des livres d'un auteur
  public async getWeightedAverageRatingForAuthor(id: string): Promise<number> {
    const author = await this.getAuthor(id);
    const books = await author.books; // Assurez-vous que les relations sont bien chargées
    const ratings = books.map(book => book.averageRating).filter(rating => rating !== null);

    if (ratings.length === 0) {
      return 0; // Pas de livres évalués
    }

    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length; // Moyenne simple des notes
  }

}
