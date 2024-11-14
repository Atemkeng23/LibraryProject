import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../database/entities/review.entity';
import { CreateReviewModel, UpdateReviewModel } from './review.model';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly repository: Repository<ReviewEntity>, // Injection du repository TypeORM
  ) {}

  public async listReviews(
    bookId: string,
    order: 'asc' | 'desc',
  ): Promise<ReviewEntity[]> {
    return this.repository.find({
      where: { bookId },
      order: { createdAt: order === 'asc' ? 'ASC' : 'DESC' },
    });
  }

  public async createReview(input: CreateReviewModel): Promise<ReviewEntity> {
    const review = this.repository.create(input); // Crée un objet ReviewEntity avec les données du DTO
    return this.repository.save(review); // Utilisation de save directement de TypeORM
  }

  public async deleteReviewsByBookId(bookId: string): Promise<void> {
    await this.repository.delete({ bookId });  // Supprime tous les avis associés au livre
  }

  public async updateReview(
    id: string,
    input: UpdateReviewModel,
  ): Promise<ReviewEntity> {
    await this.repository.update(id, input);
    return this.repository.findOneBy({ id });
  }

  public async deleteReview(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getAverageRatingForBook(bookId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.bookId = :bookId', { bookId })
      .getRawOne();
    return parseFloat(result.average);
  }

  public async getReviewsByBookId(bookId: string): Promise<ReviewEntity[]> {
    return this.repository.find({ where: { bookId } });
  }
}
