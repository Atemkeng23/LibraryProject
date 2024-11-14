import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto, UpdateReviewDto } from './review.dto';
import { ReviewModel } from './review.model';
import { ReviewEntity } from '../database/entities/review.entity';
import { BookService } from '../books/book.service'; // Import du BookService

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookService: BookService, // Injection du BookService
  ) {}

  // Liste des avis pour un livre, triés par ordre ascendant ou descendant
  public async listReviews(
    bookId: string,
    order: 'asc' | 'desc',
  ): Promise<ReviewEntity[]> {
    return this.reviewRepository.listReviews(bookId, order);
  }

  // Création d'un avis pour un livre
  async createReview(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    // Créer l'avis via le repository (utilisation de 'await' pour attendre la promesse)
    const review = await this.reviewRepository.createReview(createReviewDto);

    // Recalculer la moyenne des avis du livre après l'ajout du nouvel avis
    await this.bookService.updateBookAverageRating(createReviewDto.bookId);

    return review; // Retourner l'avis créé
  }

  // Mise à jour d'un avis
  public async updateReview(
    id: string,
    input: UpdateReviewDto,
  ): Promise<ReviewModel> {
    // Mise à jour de l'avis en utilisant le repository
    return this.reviewRepository.updateReview(id, input);
  }

  // Suppression d'un avis
  public async deleteReview(id: string): Promise<void> {
    // Supprimer l'avis en utilisant le repository
    await this.reviewRepository.deleteReview(id);
  }
}
